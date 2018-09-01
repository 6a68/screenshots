/* globals browser, startBackground */

"use strict";

console.log('>>>>> Screenshots initUI.js <<<<<');

/* This file handles the first wave of initialization:

   - check if the 'extensions.screenshots.disabled' pref is 'true'; if so, don't start the webextension
   - listen for changes to that pref (TODO: do we handle it restartlessly right now?)
   - init the UI (Photon) Library Button separately from the rest of the webextension code
*/

// TODO is this a good name?
this.initUI = (function() {
  let initialized = false;
  // TODO: how are we going to deal with startup / shutdown asynchrony? should initialized be a promise?
  function startup() {
    console.log('>>>>> Screenshots initUI startup called <<<<<');
    if (initialized) {
      return;
    }
    initialized = true;
    startBackground.init();
    browser.experiments.screenshots.initLibraryButton();
  }
  function shutdown() {
    console.log('>>>>> Screenshots initUI shutdown called <<<<<');
    if (!initialized) {
      return;
    }
    // TODO: do we need to undo the context menu etc. from the startBackground.init call?
    initialized = false;
    browser.experiments.screenshots.uninitLibraryButton();
  }

  browser.experiments.screenshots.setLifecycleListener(function onPrefChanged(value) {
    console.log('>>>>> Screenshots initUI onPrefChanged called, value is ' + value + ' <<<<<');
    // The pref is 'disabled'. if it's true, then disable. else, enable.
    if (value === true) {
      shutdown();
    } else {
      startup();
    }
  });

  // TODO: how do we respond to startup/shutdown events passed to the webextension?
  if (browser.experiments.screenshots.isEnabled()) {
    startup();
  }

})();
