/* globals ADDON_DISABLE LegacyExtensionsUtils */
const ADDON_ID = "screenshots@mozilla.org";
ChromeUtils.defineModuleGetter(this, "LegacyExtensionsUtils",
                               "resource://gre/modules/LegacyExtensionsUtils.jsm");

function startup(data, reason) {
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: data.resourceURI
  });

  // TODO: is this check necessary?
  if (!webExtension.started) {
    webExtension.startup(reason, data).catch(console.error);
  }
}

function shutdown(data, reason) { // eslint-disable-line no-unused-vars
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: data.resourceURI
  });
  webExtension.shutdown(reason);
}

function install(data, reason) {} // eslint-disable-line no-unused-vars

function uninstall(data, reason) {} // eslint-disable-line no-unused-vars
