const { addReactScripts } = require("./reactutils");
const ReactDOMServer = require("react-dom/server");
const { getGitRevision } = require("./linker");
const l10n = require("./l10n");
// TODO: isn't it a bit weird to do all this in here?
const React = require("react");
const { LocalizationProvider } = require("fluent-react/compat");

exports.render = function(req, res, page) {
  let modelModule = require("./" + page.modelModuleName);
  let viewModule = page.viewModule;
  Promise.resolve(modelModule.createModel(req)).then((model) => {
    model.backend = req.backend;
    let jsonModel = model.jsonModel || model;
    let serverModel = model.serverModel || model;
    let csrfToken = req.csrfToken && req.csrfToken();
    jsonModel = Object.assign({
      authenticated: !!req.deviceId,
      sentryPublicDSN: req.config.sentryPublicDSN,
      backend: req.backend,
      gitRevision: getGitRevision(),
      csrfToken,
      abTests: req.abTests
    }, jsonModel);
    serverModel = Object.assign({
      authenticated: !!req.deviceId,
      sentryPublicDSN: req.config.sentryPublicDSN,
      staticLink: req.staticLink,
      staticLinkWithHost: req.staticLinkWithHost,
      csrfToken,
      abTests: req.abTests
    }, serverModel);
    if (req.query.data == "json") {
      if (req.query.pretty !== undefined) {
        res.type("json").send(JSON.stringify(jsonModel, null, '  '));
      } else {
        res.type("json").send(jsonModel);
      }
      return;
    }
    let head = ReactDOMServer.renderToStaticMarkup(
      <LocalizationProvider messages={req.messages()}>
        {viewModule.HeadFactory(serverModel)}
      </LocalizationProvider>);
    let foo = req.messages();
    let nxt = foo.next();
    console.log(`req.messages() yields: ${foo}`);
    console.log(`next is ${nxt}`);
    let body = <LocalizationProvider messages={req.messages()}>
                 {viewModule.BodyFactory(serverModel)}
               </LocalizationProvider>;
    if (page.noBrowserJavascript) {
      body = ReactDOMServer.renderToStaticMarkup(body);
    } else {
      body = ReactDOMServer.renderToString(body);
    }
    let doc = `
    <html>
      ${head}
      <body>
        <div id="react-body-container">${body}</div>
      </body></html>
    `.trim();
    if (!page.noBrowserJavascript) {
      // FIXME: we should just inline the addReactScripts functionality in this function:
      let script = `\
window.initialModel = ${JSON.stringify(jsonModel)};
window.initialModelLaunched = false;
if (window.controller) {
  window.controller.launch(window.initialModel);
  window.initialModelLaunched = true;
}
`;
      if (page.extraBodyJavascript) {
        script += page.extraBodyJavascript;
      }
      doc = addReactScripts(doc, script, req.cspNonce);
    }
    res.send(doc);
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err + "\n" + err.stack);
  });
};
