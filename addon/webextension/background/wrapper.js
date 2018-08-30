/* globals browser, startBackground */

"use strict";

/* This file handles the first wave of initialization, formerly bootstrap stuff:

   - check if the 'extensions.screenshots.disabled' pref is 'true'; if so, don't start the webextension
   - listen for changes to that pref (TODO: do we handle it restartlessly right now?)
   - init the (Photon) Library Button separately from the rest of the webextension code
*/

// TODO come up with a better name than 'wrapper'
this.wrapper = (function() {
  const initialized = false;
  // TODO: how are we going to deal with startup / shutdown asynchrony? should initialized be a promise?
  function startup() {
    if (initialized) {
      return;
    }
    initialized = true;
    startBackground.init();
    browser.experiments.screenshots.initLibraryButton();
  }
  function shutdown() {
    if (!initialized) {
      return;
    }
    // TODO: do we need to undo the context menu etc. from the startBackground.init call?
    initialized = false;
    browser.experiments.screenshots.uninitLibraryButton();
  }

  if (browser.experiments.screenshots.isEnabled()) {
    startup();
  }
  // set up pref listener to respond to later changes
})();
