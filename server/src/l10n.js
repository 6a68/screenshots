const fs = require('fs');
const path = require('path');

const glob = require('glob');

require("fluent-intl-polyfill/compat");
const { MessageContext } = require("fluent/compat");
const negotiateLanguages = require("fluent-langneg/compat");

function getStrings() {
  // 1. load the files
  // - get the location from a config argument or file
  // - inside the top-level locales dir, each directory will be a locale
  // - so, the label is the directory name, 
  // - then the contents are: read in the ftl file in that directory, if present
  //   - if not present, skip
  //
  // ok, try again.
  // first, get a list of all available locales. that is, directories inside $path (../locales?) that contain $filename (server.ftl?)
  // now, you have a list of directories that do contain translations.
  // for each item in the list, load the file, and set files[$locale] = $fileContents.
  // now, for each key in the object, run that through the FTL parser.
  // and you're done.

  // now, do it.
  // # get a list of all directories under locales that have a server.ftl file.
  // (right now, should just be one directory).

  // now we have the list of locales that contain a server.ftl file
  // wouldn't it be easier to just glob for this? locales/*/server.ftl?
  // yeah, let's try using the glob library instead.
  const LOCALES_CFG = '../../locales'; // TODO get this from config somehow
  const LOCALES_DIR = path.join(process.cwd(), LOCALES_CFG);
  const localesGlob = LOCALES_DIR + '/*/server.ftl';
  // this is the object we'll append to
  const MESSAGES = {};
  glob(localesGlob, (err, paths) => {
    err && throw err;
    // now paths is like [ '/Users/jhirsch/codez/github/mozilla-services-screenshots/locales/en-US/server.ftl' ]
    // so we want to break it into pieces, get the next-to-last one, and use that as the key:
    if (!paths.length) { throw new Error(`No ftl files found at ${localesGlob}. Giving up`); }
    paths.forEach(path => {
      locale = path.split('/').slice(-2, -1);
      fs.readFile(path, 'utf-8', (err, contents) => {
        if (err) {
          console.error(`failed to open ${locale} ftl file: `, err);
        } else {
          MESSAGES[locale] = contents;
        }
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
