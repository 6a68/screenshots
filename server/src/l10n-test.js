import 'fluent-intl-polyfill/compat';
import { MessageContext } from 'fluent/compat';

const MESSAGES_ALL = {
  'en': `
downloadButton
  .title = foo`
};

const ctx = new MessageContext(MESSAGES_ALL['en']);
console.log('the downloadButton title is ', ctx.getMessage('downloadButton.title'));
