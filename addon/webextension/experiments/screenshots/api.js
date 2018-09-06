/* globals browser, AppConstants, CustomizableUI, ExtensionCommon, Services, ExtensionAPI */

"use strict";

ChromeUtils.defineModuleGetter(this, "AppConstants",
                               "resource://gre/modules/AppConstants.jsm");
ChromeUtils.defineModuleGetter(this, "CustomizableUI",
                               "resource:///modules/CustomizableUI.jsm");
ChromeUtils.defineModuleGetter(this, "ExtensionCommon",
                               "resource://gre/modules/ExtensionCommon.jsm");
ChromeUtils.defineModuleGetter(this, "PageActions",
                               "resource:///modules/PageActions.jsm");
ChromeUtils.defineModuleGetter(this, "Services",
                               "resource://gre/modules/Services.jsm");

let prefChangeListeners = new Set();

// TODO: how do we correctly tie this to shutdown? Do we set up a shutdown listener to unregister?
const _prefObserver = {
  register() {
    Services.prefs.addObserver("extensions.screenshots.", this, false); // eslint-disable-line mozilla/no-useless-parameters
    Services.console.logStringMessage('>>>>> Screenshots API registered observer for screenshots.disabled <<<<<');
  },
  unregister() {
    Services.prefs.removeObserver("extensions.screenshots.", this, false); // eslint-disable-line mozilla/no-useless-parameters
    Services.console.logStringMessage('>>>>> Screenshots API unregistered observer for screenshots.disabled <<<<<');
  },
  observe(aSubject, aTopic, aData) {
    // aSubject is the nsIPrefBranch we're observing (after appropriate QI)
    // aData is the name of the pref that's been changed (relative to aSubject)
    if (aData !== "extensions.screenshots.disabled") {
      return;
    }
    const newValue = Services.prefs.getBoolPref("extensions.screenshots.disabled", false);
    Services.console.logStringMessage('>>>>> Screenshots API observed a pref change for screenshots.disabled, new value is ' + newValue + ' <<<<<');
    // if the value has been changed to 'true', then we're disabled. notify observers.
    prefChangeListeners.forEach(listener => listener(newValue));
  }
}
_prefObserver.register(); // TODO: how to unregister on shutdown?

// TODO: should the Library button be moved to a separate file?
const LibraryButton = {
  ITEM_ID: "appMenu-library-screenshots",

  init(webExtension) {
    this._initialized = true;
    const permissionPages = [...webExtension.permissions].filter(p => (/^https?:\/\//i).test(p));
    if (permissionPages.length > 1) {
      Cu.reportError(new Error("Should not have more than 1 permission page, but got: " + JSON.stringify(permissionPages)));
    }
    this.PAGE_TO_OPEN = permissionPages.length === 1 ? permissionPages[0].replace(/\*$/, "") : "https://screenshots.firefox.com/";
    this.PAGE_TO_OPEN += "shots";
    this.ICON_URL = webExtension.getURL("icons/icon-v2.svg");
    this.LABEL = webExtension.localizeMessage("libraryLabel");
    CustomizableUI.addListener(this);
    for (const win of CustomizableUI.windows) {
      this.onWindowOpened(win);
    }
  },

  uninit() {
    if (!this._initialized) {
      return;
    }
    for (const win of CustomizableUI.windows) {
      const item = win.document.getElementById(this.ITEM_ID);
      if (item) {
        item.remove();
      }
    }
    CustomizableUI.removeListener(this);
    this._initialized = false;
  },

  onWindowOpened(win) {
    const libraryViewInsertionPoint = win.document.getElementById("appMenu-library-remotetabs-button");
    // If the library view doesn't exist (on non-photon builds, for instance),
    // this will be null, and we bail out early.
    if (!libraryViewInsertionPoint) {
      return;
    }
    const parent = libraryViewInsertionPoint.parentNode;
    const {nextSibling} = libraryViewInsertionPoint;
    const item = win.document.createElement("toolbarbutton");
    item.className = "subviewbutton subviewbutton-iconic";
    item.addEventListener("command", () => win.openWebLinkIn(this.PAGE_TO_OPEN, "tab"));
    item.id = this.ITEM_ID;
    const iconURL = this.ICON_URL;
    item.setAttribute("image", iconURL);
    item.setAttribute("label", this.LABEL);

    parent.insertBefore(item, nextSibling);
  },
};

let photonPageAction;

// If the current Firefox version supports Photon (57 and later), this sets up
// a Photon page action and removes the UI for the WebExtension browser action.
// Does nothing otherwise.  Ideally, in the future, WebExtension page actions
// and Photon page actions would be one in the same, but they aren't right now.
function initPhotonPageAction(api, webExtension) {
  const id = "screenshots";
  let port = null;

  const {tabManager} = webExtension.extension;

  // Make the page action.
  photonPageAction = PageActions.actionForID(id) || PageActions.addAction(new PageActions.Action({
    id,
    title: "Take a Screenshot",
    iconURL: webExtension.extension.getURL("icons/icon-v2.svg"),
    _insertBeforeActionID: null,
    onCommand(event, buttonNode) {
      if (port) {
        const browserWin = buttonNode.ownerGlobal;
        const tab = tabManager.getWrapper(browserWin.gBrowser.selectedTab);
        port.postMessage({
          type: "click",
          tab: {id: tab.id, url: tab.url}
        });
      }
    },
  }));
  // Establish a port to the WebExtension side.
  api.browser.runtime.onConnect.addListener((listenerPort) => {
    if (listenerPort.name !== "photonPageActionPort") {
      return;
    }
    port = listenerPort;
    port.onMessage.addListener((message) => {
      switch (message.type) {
      case "setProperties":
        if (message.title) {
          photonPageAction.setTitle(message.title);
        }
        if (message.iconPath) {
          photonPageAction.setIconURL(webExtension.extension.getURL(message.iconPath));
        }
        break;
      default:
        console.error("Unrecognized message:", message);
        break;
      }
    });
  });
}


this.screenshots = class extends ExtensionAPI {
  // TODO should we init the pref observer in the constructor?
  getAPI(context) {
    let {extension} = context;
    return {
      experiments: {
        screenshots: {
          // If you are checking for 'nightly', also check for 'nightly-try'.
          //
          // Otherwise, just use the standard builds, but be aware of the many
          // non-standard options that also exist (as of August 2018).
          //
          // Standard builds:
          //   'esr' - ESR channel
          //   'release' - release channel
          //   'beta' - beta channel
          //   'nightly' - nightly channel
          // Non-standard / deprecated builds:
          //   'aurora' - deprecated aurora channel (still observed in dxr)
          //   'default' - local builds from source
          //   'nightly-try' - nightly Try builds (QA may occasionally need to test with these)
          getUpdateChannel() {
            return AppConstants.MOZ_UPDATE_CHANNEL;
          },
          isHistoryEnabled() {
            return Services.prefs.getBoolPref("places.history.enabled", true);
          },
          isUploadDisabled() {
            return Services.prefs.getBoolPref("extensions.screenshots.upload-disabled", false);
          },
          onPrefChanged: new ExtensionCommon.EventManager({
            context,
            name: "screenshots.onEnabled",
            register: fire => {
              let value = Services.prefs.getBoolPref("extensions.screenshots.upload-disabled", false);
              let observer = () => {
                fire.async(value);
              };
              prefChangeListeners.add(observer);
              return () => {
                prefChangeListeners.delete(observer);
              };
            },
          }).api(),
          // Note: calling the pref 'disabled' was a design mistake. let's start to fix it now.
          isEnabled() {
            return !Services.prefs.getBoolPref("extensions.screenshots.disabled", false);
          },
          initLibraryButton() {
            return LibraryButton.init(extension);
          },
          uninitLibraryButton() {
            return LibraryButton.uninit();
          },
        },
      },
    };
  }
};
