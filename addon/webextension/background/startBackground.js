/* globals browser, main, communication */
/* This file handles:
     clicks on the WebExtension page action
     browser.contextMenus.onClicked
     browser.runtime.onMessage
   and loads the rest of the background page in response to those events, forwarding
   the events to main.onClicked, main.onClickedContextMenu, or communication.onMessage
*/

// TODO: do we init the Library Button from here, too?
// TODO: should we have a wrapper that calls this if the pref is enabled?

const startTime = Date.now();

this.startBackground = (function() {
  const backgroundScripts = [
    "log.js",
    "makeUuid.js",
    "catcher.js",
    "blobConverters.js",
    "background/selectorLoader.js",
    "background/communication.js",
    "background/auth.js",
    "background/senderror.js",
    "build/raven.js",
    "build/shot.js",
    "build/thumbnailGenerator.js",
    "background/analytics.js",
    "background/deviceInfo.js",
    "background/takeshot.js",
    "background/main.js"
  ];

  const contextMenuItem = {
    id: "create-screenshot",
    title: browser.i18n.getMessage("contextMenuLabel"),
    contexts: ["page"],
    documentUrlPatterns: ["<all_urls>"]
  };

  const pageActionItem = {
    id: "create-screenshots-page-action",
    //title: browser.i18n.getMessage("contextMenuLabel"),
    title: "yay screenshots",
    contexts: ["page_action"],
    icons: {
      "32": "icons/icon-v2.svg"
    },
    documentUrlPatterns: ["<all_urls>"]
  };

  let onContextMenuClick;
  let onPageActionClick;

  function init() {
    // TODO: init pageAction imperatively, not via manifest

    browser.menus.create(pageActionItem);
    onPageActionClick = tab => {
      loadIfNecessary().then(() => {
        main.onClicked(tab);
      }).catch(error => {
        console.error("Error loading Screenshots:", error);
      });
    };
    browser.pageAction.onClicked.addListener(onPageActionClick);

    browser.contextMenus.create(contextMenuItem);
    onContextMenuClick = (info, tab) => {
      loadIfNecessary().then(() => {
        main.onClickedContextMenu(info, tab);
      }).catch((error) => {
        console.error("Error loading Screenshots:", error);
      });
    };
    browser.contextMenus.onClicked.addListener(onContextMenuClick);

    // TODO: do we even need this if bootstrap is gone?
    browser.runtime.onMessage.addListener((req, sender, sendResponse) => {
      loadIfNecessary().then(() => {
        return communication.onMessage(req, sender, sendResponse);
      }).catch((error) => {
        console.error("Error loading Screenshots:", error);
      });
      return true;
    });

    let loadedPromise;

    function loadIfNecessary() {
      if (loadedPromise) {
        return loadedPromise;
      }
      loadedPromise = Promise.resolve();
      backgroundScripts.forEach((script) => {
        loadedPromise = loadedPromise.then(() => {
          return new Promise((resolve, reject) => {
            const tag = document.createElement("script");
            tag.src = browser.extension.getURL(script);
            tag.onload = () => {
              resolve();
            };
            tag.onerror = (error) => {
              const exc = new Error(`Error loading script: ${error.message}`);
              exc.scriptName = script;
              reject(exc);
            };
            document.head.appendChild(tag);
          });
        });
      });
      return loadedPromise;
    }
  };

  function uninit() {
    browser.contextMenus.onClicked.removeListener(onContextMenuClick);
    browser.contextMenus.remove("create-screenshot");
    // TODO: remove pageAction imperatively, not via manifest
    browser.pageAction.onClicked.removeListener(onPageActionClick);
    browser.menus.remove("create-screenshot-page-action");
  }

  const exports = {startTime, init, uninit};
  return exports;
})();
