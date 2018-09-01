/* globals ADDON_DISABLE LegacyExtensionsUtils */
const ADDON_ID = "screenshots@mozilla.org";
ChromeUtils.defineModuleGetter(this, "LegacyExtensionsUtils",
                               "resource://gre/modules/LegacyExtensionsUtils.jsm");
ChromeUtils.defineModuleGetter(this, "Services",
                               "resource://gre/modules/Services.jsm");

function startup(data, reason) {
  Services.console.logStringMessage('>>>>> Screenshots addon received startup from system <<<<<');

  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: data.resourceURI
  });

  // TODO: is this check necessary?
  if (webExtension.started) {
    return;
  }
  Services.console.logStringMessage('>>>>> Screenshots addon about to start embedded webextension <<<<<');
  webExtension.startup(reason, data).then(() => {
      Services.console.logStringMessage('>>>>> Screenshots addon started webextension successfully <<<<<');
    }).catch(err => {
      Services.console.logStringMessage('>>>>> Screenshots addon webextension startup failed! <<<<<');
      console.error(err);
    });
}

function shutdown(data, reason) { // eslint-disable-line no-unused-vars
  Services.console.logStringMessage('>>>>> Screenshots addon received shutdown from system <<<<<');
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: data.resourceURI
  });
  webExtension.shutdown(reason).then(() => {
      Services.console.logStringMessage('>>>>> Screenshots addon shutdown webextension successfully <<<<<');
    }).catch(err => {
      Services.console.logStringMessage('>>>>> Screenshots addon webextension shutdown failed! <<<<<');
      console.error(err);
    });
}

function install(data, reason) {} // eslint-disable-line no-unused-vars

function uninstall(data, reason) {} // eslint-disable-line no-unused-vars
