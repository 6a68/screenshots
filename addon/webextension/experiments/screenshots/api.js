/* globals browser, AppConstants, ExtensionAPI */

"use strict";

ChromeUtils.defineModuleGetter(this, "AppConstants",
                               "resource://gre/modules/AppConstants.jsm");
ChromeUtils.defineModuleGetter(this, "CustomizableUI",
                               "resource:///modules/CustomizableUI.jsm");
ChromeUtils.defineModuleGetter(this, "Services",
                               "resource://gre/modules/Services.jsm");

// maybe the name should be something related to lifecycle observers?
// since this pref will presumably become a managed storage thing, but
// will continue to have the same meaning?
const disableObservers = []; // TODO: should this be a Set or WeakSet?
const prefObserver = {
  register() {
    Services.prefs.addObserver("extensions.screenshots.", this, false); // eslint-disable-line mozilla/no-useless-parameters
  },
  unregister() {
    Services.prefs.removeObserver("extensions.screenshots.", this, false); // eslint-disable-line mozilla/no-useless-parameters
  },
  observe(aSubject, aTopic, aData) {
    // aSubject is the nsIPrefBranch we're observing (after appropriate QI)
    // aData is the name of the pref that's been changed (relative to aSubject)
    if (aData === "extensions.screenshots.disabled") {
      // call each registered callback with the value of the pref and assume 'this', if needed, was already bound
      disableObservers.forEach(fn => fn.call(null, Services.prefs.getBoolPref("extensions.screenshots.disabled", false)));

      // eslint-disable-next-line promise/catch-or-return
      // appStartupPromise = appStartupPromise.then(handleStartup);
    }
  }
}

// TODO: should the Library button be moved to a separate file?
const LibraryButton = {
  ITEM_ID: "appMenu-library-screenshots",

  init(webExtension) {
    this._initialized = true;
    const permissionPages = [...webExtension.extension.permissions].filter(p => (/^https?:\/\//i).test(p));
    if (permissionPages.length > 1) {
      Cu.reportError(new Error("Should not have more than 1 permission page, but got: " + JSON.stringify(permissionPages)));
    }
    this.PAGE_TO_OPEN = permissionPages.length === 1 ? permissionPages[0].replace(/\*$/, "") : "https://screenshots.firefox.com/";
    this.PAGE_TO_OPEN += "shots";
    this.ICON_URL = webExtension.extension.getURL("icons/icon-v2.svg");
    this.LABEL = webExtension.extension.localizeMessage("libraryLabel");
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

this.screenshots = class extends ExtensionAPI {
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
          // TODO: fix the name, this is terrible
          addLifecycleListener(cb) {
            if (disableObservers.includes(cb)) {
              return;
            }
            disableObservers.push(cb);
          },
          removeLifecycleListener(cb) {
            if (!disableObservers.includes(cb)) {
              return;
            }
            disableObservers.splice(disableObservers.indexOf(cb), 1);
          }
          // Note: calling the pref 'disabled' was a design mistake. let's start to fix it now.
          isEnabled() {
            return !Services.prefs.getBoolPref("extensions.screenshots.disabled", false);
          },
          initLibraryButton() {
            return LibraryButton.init(extension);
          }
          uninitLibraryButton() {
            return LibraryButton.uninit();
          }
        },
      },
    };
  }
};
