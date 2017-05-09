const fs = require('fs');
const path = require('path');

const glob = require('glob');

require("fluent-intl-polyfill/compat");
const { MessageContext } = require("fluent/compat");
const negotiateLanguages = require("fluent-langneg/compat");

function getStrings() {
  const LOCALES_CFG = '../../locales'; // TODO get this from config somehow
  const LOCALES_DIR = path.join(process.cwd(), LOCALES_CFG);
  const localesGlob = LOCALES_DIR + '/*/server.ftl';
  const MESSAGES = {};
  glob(localesGlob, (err, paths) => {
    err && throw err;
    if (!paths.length) { throw new Error(`No ftl files found at ${localesGlob}. Giving up`); }
    paths.forEach(path => {
      // now paths is like [ '/path/to/screenshots/locales/en-US/server.ftl' ]
      // so we want to break it into pieces, get the next-to-last one, and use that as the key:
      locale = path.split('/').slice(-2, -1);
      let contents = fs.readFileSync(path, 'utf-8');
      if (!contents) {
        return console.error(`failed to open ${locale} ftl file: `, err);
      }
      // TODO: pass contents into the FTL parser before assigning.
      MESSAGES[locale] = contents;
        // finally, MESSAGES is ready to go.
        // next, we pass that into the FTL parser, and return the resulting object.
        // promise-based API is probably nicer for all this.
      });
    });





  // 2. pass into fluent's FTL parser
  // 3. assemble into an object. done



  // TODO: generate an object of the form:
  // { 'en-US': { l10nKey: 'l10nString' },
  //   'foo': { l10Key: 'l10nStringFooed' } }
}

let messageContext;

export function* generateMessages(userLocales) {
  const currentLocales = negotiateLanguages(
    userLocales,
    ['en-US'],
    { defaultLocale: 'en-US' }
  );

  const STRINGS = getStrings();

  for (const locale of currentLocales) {
    messageContext = new MessageContext(locale);
    messageContext.addMessages(STRINGS[locale]);
    yield messageContext;
  }
}

// pass in the l10n-id as the first argument, and key-values as
// a second argument:
//
// If the message is "welcome = Hello, {user}"
// then the correct call would be: 
//   const _ = require("./l10n");
//   _('welcome', {user: 'firefox user'});
//
export default function getText(l10nID, opts) {
  if (typeof messageContext === "undefined") {
    throw new Error('must generateMessages before calling getText');
  }
  let msg = messageContext.messages.get(l10nID);
  if (!msg) {
    throw new Error(`unable to find translation for l10n ID ${l10nID}`);
  }
  return messageContext.format(msg, opts);
}
