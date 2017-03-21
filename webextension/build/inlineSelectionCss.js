/* Created from build/server/static/css/inline-selection.css */
window.inlineSelectionCss = `
.button, .pageshot-highlight-button-cancel, .pageshot-highlight-button-save, .pageshot-highlight-button-download, .pageshot-myshots, .pageshot-visible, .pageshot-full-page {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3) inset;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  height: 40px;
  min-width: 40px;
  outline: none;
  padding: 0 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background 150ms;
  user-select: none;
  white-space: nowrap; }
  .button.small, .small.pageshot-highlight-button-cancel, .small.pageshot-highlight-button-save, .small.pageshot-highlight-button-download, .small.pageshot-myshots, .small.pageshot-visible, .small.pageshot-full-page {
    height: 32px;
    line-height: 32px;
    padding: 0 8px; }
  .button.tiny, .tiny.pageshot-highlight-button-cancel, .tiny.pageshot-highlight-button-save, .tiny.pageshot-highlight-button-download, .tiny.pageshot-myshots, .tiny.pageshot-visible, .tiny.pageshot-full-page {
    font-size: 12px;
    height: 22px;
    line-height: 12px;
    padding: 2px 6px; }
  .button.set-width--medium, .set-width--medium.pageshot-highlight-button-cancel, .set-width--medium.pageshot-highlight-button-save, .set-width--medium.pageshot-highlight-button-download, .set-width--medium.pageshot-myshots, .set-width--medium.pageshot-visible, .set-width--medium.pageshot-full-page {
    max-width: 200px; }
  .button.inline, .inline.pageshot-highlight-button-cancel, .inline.pageshot-highlight-button-save, .inline.pageshot-highlight-button-download, .inline.pageshot-myshots, .inline.pageshot-visible, .inline.pageshot-full-page {
    display: inline-block; }
  .button.block-button, .block-button.pageshot-highlight-button-cancel, .block-button.pageshot-highlight-button-save, .block-button.pageshot-highlight-button-download, .block-button.pageshot-myshots, .block-button.pageshot-visible, .block-button.pageshot-full-page {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: none;
    border-radius: 0;
    height: 100%;
    line-height: 100%;
    padding: 0 20px;
    margin-right: 20px;
    flex: 0 0 155px; }
  .button .arrow-icon, .pageshot-highlight-button-cancel .arrow-icon, .pageshot-highlight-button-save .arrow-icon, .pageshot-highlight-button-download .arrow-icon, .pageshot-myshots .arrow-icon, .pageshot-visible .arrow-icon, .pageshot-full-page .arrow-icon {
    display: inline-block;
    position: relative;
    top: 1px;
    flex: 0 0 18px;
    height: 16px;
    opacity: .6;
    background-image: url(../img/arrow-page-right-16.svg);
    background-position: right center;
    background-repeat: no-repeat; }

.inverse-color-scheme {
  background: #383E49;
  color: #FFF; }
  .inverse-color-scheme a {
    color: #FFF; }
  .inverse-color-scheme .large-icon {
    filter: invert(100%); }

.default-color-scheme {
  background: #f2f2f2;
  color: #000; }
  .default-color-scheme a {
    color: #00AFF7; }

.button.primary, .primary.pageshot-highlight-button-cancel, .pageshot-highlight-button-save, .primary.pageshot-highlight-button-download, .primary.pageshot-myshots, .primary.pageshot-visible, .primary.pageshot-full-page {
  background-color: #00AFF7;
  color: #FFF; }
  .button.primary:hover, .primary.pageshot-highlight-button-cancel:hover, .pageshot-highlight-button-save:hover, .primary.pageshot-highlight-button-download:hover, .primary.pageshot-myshots:hover, .primary.pageshot-visible:hover, .primary.pageshot-full-page:hover, .button.primary:focus, .primary.pageshot-highlight-button-cancel:focus, .pageshot-highlight-button-save:focus, .primary.pageshot-highlight-button-download:focus, .primary.pageshot-myshots:focus, .primary.pageshot-visible:focus, .primary.pageshot-full-page:focus {
    background: #0096d3; }
  .button.primary:active, .primary.pageshot-highlight-button-cancel:active, .pageshot-highlight-button-save:active, .primary.pageshot-highlight-button-download:active, .primary.pageshot-myshots:active, .primary.pageshot-visible:active, .primary.pageshot-full-page:active {
    background: #0084ba; }

.button.secondary, .pageshot-highlight-button-cancel, .secondary.pageshot-highlight-button-save, .pageshot-highlight-button-download, .pageshot-myshots, .pageshot-visible, .pageshot-full-page {
  background: #EBEBEB;
  color: #000; }
  .button.secondary:hover, .pageshot-highlight-button-cancel:hover, .secondary.pageshot-highlight-button-save:hover, .pageshot-highlight-button-download:hover, .pageshot-myshots:hover, .pageshot-visible:hover, .pageshot-full-page:hover, .button.secondary:focus, .pageshot-highlight-button-cancel:focus, .secondary.pageshot-highlight-button-save:focus, .pageshot-highlight-button-download:focus, .pageshot-myshots:focus, .pageshot-visible:focus, .pageshot-full-page:focus {
    background: #d9d9d9; }
  .button.secondary:active, .pageshot-highlight-button-cancel:active, .secondary.pageshot-highlight-button-save:active, .pageshot-highlight-button-download:active, .pageshot-myshots:active, .pageshot-visible:active, .pageshot-full-page:active {
    background: #cccccc; }

.button.warning, .warning.pageshot-highlight-button-cancel, .warning.pageshot-highlight-button-save, .warning.pageshot-highlight-button-download, .warning.pageshot-myshots, .warning.pageshot-visible, .warning.pageshot-full-page {
  color: #FFF;
  background: #d92215; }
  .button.warning:hover, .warning.pageshot-highlight-button-cancel:hover, .warning.pageshot-highlight-button-save:hover, .warning.pageshot-highlight-button-download:hover, .warning.pageshot-myshots:hover, .warning.pageshot-visible:hover, .warning.pageshot-full-page:hover, .button.warning:focus, .warning.pageshot-highlight-button-cancel:focus, .warning.pageshot-highlight-button-save:focus, .warning.pageshot-highlight-button-download:focus, .warning.pageshot-myshots:focus, .warning.pageshot-visible:focus, .warning.pageshot-full-page:focus {
    background: #b81d12; }
  .button.warning:active, .warning.pageshot-highlight-button-cancel:active, .warning.pageshot-highlight-button-save:active, .warning.pageshot-highlight-button-download:active, .warning.pageshot-myshots:active, .warning.pageshot-visible:active, .warning.pageshot-full-page:active {
    background: #a11910; }

.subtitle-link {
  color: #00AFF7; }

.pageshot-hide-movers .pageshot-mover {
  display: none; }

.pageshot-highlight {
  position: absolute;
  cursor: move;
  border: 1px dashed rgba(0, 175, 247, 0.5);
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
  z-index: 9999999999; }

.pageshot-highlight-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  bottom: -55px;
  right: 0;
  z-index: 6; }
  .pageshot-bottom-selection .pageshot-highlight-buttons {
    bottom: 5px; }

.pageshot-highlight-button-cancel {
  background: #EBEBEB url("MOZ_EXTENSION/icons/cancel.svg") center center no-repeat;
  background-size: 18px 18px;
  margin: 5px;
  width: 40px; }
  .pageshot-highlight-button-cancel:hover, .pageshot-highlight-button-cancel:focus, .pageshot-highlight-button-cancel:active {
    background: #d9d9d9 url("MOZ_EXTENSION/icons/cancel.svg") center center no-repeat;
    background-size: 18px 18px; }

.pageshot-highlight-button-save {
  font-size: 18px;
  margin: 5px;
  width: 80px; }

.pageshot-highlight-button-download {
  background: #EBEBEB url("MOZ_EXTENSION/icons/download.svg") center center no-repeat;
  background-size: 18px 18px;
  margin: 5px;
  width: 40px; }
  .pageshot-highlight-button-download:hover, .pageshot-highlight-button-download:focus, .pageshot-highlight-button-download:active {
    background: #d9d9d9 url("MOZ_EXTENSION/icons/download.svg") center center no-repeat;
    background-size: 18px 18px; }

.pageshot-highlight-button-cancel,
.pageshot-highlight-button-download {
  opacity: 0.9;
  transition: opacity 250ms; }
  .pageshot-highlight-button-cancel:hover, .pageshot-highlight-button-cancel:focus, .pageshot-highlight-button-cancel:active,
  .pageshot-highlight-button-download:hover,
  .pageshot-highlight-button-download:focus,
  .pageshot-highlight-button-download:active {
    opacity: 1; }

.pageshot-mover-target {
  position: absolute;
  z-index: 5;
  pointer-events: auto; }

.pageshot-highlight,
.pageshot-mover-target {
  background-color: transparent;
  background-image: none; }

.pageshot-mover-target,
.pageshot-bghighlight {
  border: 0; }

.pageshot-mover-target.pageshot-topLeft {
  cursor: nwse-resize;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px; }

.pageshot-mover-target.pageshot-top {
  cursor: ns-resize;
  top: -10px;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 4; }

.pageshot-mover-target.pageshot-topRight {
  cursor: nesw-resize;
  top: -10px;
  right: -10px;
  height: 50px;
  width: 50px; }

.pageshot-mover-target.pageshot-left {
  cursor: ew-resize;
  top: 0;
  left: -10px;
  height: 100%;
  width: 50px;
  z-index: 4; }

.pageshot-mover-target.pageshot-right {
  cursor: ew-resize;
  top: 0;
  right: -10px;
  height: 100%;
  width: 50px;
  z-index: 4; }

.pageshot-mover-target.pageshot-bottomLeft {
  cursor: nesw-resize;
  left: -10px;
  bottom: -10px;
  width: 50px;
  height: 50px; }

.pageshot-mover-target.pageshot-bottom {
  cursor: ns-resize;
  left: 0;
  bottom: -10px;
  width: 100%;
  height: 50px;
  z-index: 4; }

.pageshot-mover-target.pageshot-bottomRight {
  cursor: nwse-resize;
  bottom: -10px;
  right: -10px;
  width: 50px;
  height: 50px; }

.pageshot-mover-target:hover .pageshot-mover {
  opacity: 1; }

.pageshot-mover {
  background-color: #00AFF7;
  border-radius: 2px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) inset;
  height: 25px;
  opacity: 0.5;
  position: absolute;
  transition: opacity 150ms, width 150ms, height 150ms;
  width: 25px;
  z-index: 1001; }
  .pageshot-small-selection .pageshot-mover {
    height: 10px;
    width: 10px; }

.pageshot-topLeft .pageshot-mover {
  top: 10px;
  left: 10px; }

.pageshot-top .pageshot-mover {
  top: 10px;
  left: 50%;
  margin-left: -12.5px; }
  .pageshot-small-selection .pageshot-top .pageshot-mover {
    margin-left: -5px; }

.pageshot-topRight .pageshot-mover {
  top: 10px;
  right: 10px; }

.pageshot-left .pageshot-mover {
  top: 50%;
  margin-top: -12.5px;
  left: 10px; }
  .pageshot-small-selection .pageshot-left .pageshot-mover {
    margin-top: -5px; }

.pageshot-right .pageshot-mover {
  top: 50%;
  margin-top: -12.5px;
  right: 10px; }
  .pageshot-small-selection .pageshot-right .pageshot-mover {
    margin-top: -5px; }

.pageshot-bottomLeft .pageshot-mover {
  bottom: 10px;
  left: 10px; }

.pageshot-bottom .pageshot-mover {
  left: 50%;
  margin-left: -12.5px;
  bottom: 10px; }
  .pageshot-small-selection .pageshot-bottom .pageshot-mover {
    margin-left: -5px; }

.pageshot-bottomRight .pageshot-mover {
  right: 10px;
  bottom: 10px; }

.pageshot-bghighlight {
  position: absolute;
  background-color: rgba(50, 50, 50, 0.5);
  z-index: 9999999999; }

.pageshot-textbutton {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #666;
  box-shadow: 5px 5px 10px #999;
  border-radius: 2px;
  text-align: center;
  vertical-align: center;
  color: #000;
  background-color: #fff;
  z-index: 2000;
  cursor: pointer; }

.pageshot-horizcross {
  position: fixed;
  left: 0;
  width: 100%;
  height: 0;
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 10000000049;
  pointer-events: none; }

.pageshot-vertcross {
  position: fixed;
  top: 0;
  height: 100%;
  width: 0;
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 10000000049;
  pointer-events: none; }

.pageshot-preview-overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999999999; }

.pageshot-pixel-dimensions {
  position: absolute;
  pointer-events: none;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 70%;
  color: #000;
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; }

.pageshot-moving-element {
  pointer-events: none;
  position: absolute;
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%; }

.pageshot-preview-instructions {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: pageshot-pulse ease-in-out 200ms;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  color: #fff;
  font-family: sans-serif;
  font-size: 12pt;
  font-weight: bold;
  margin: 0 auto;
  min-height: 20px;
  padding: 10px 20px;
  vertical-align: middle;
  z-index: 999999999; }

.pageshot-myshots, .pageshot-visible, .pageshot-full-page {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  pointer-events: all;
  position: absolute;
  right: 25px;
  top: 15px;
  width: 116px; }

/* styleMyShotsButton test: */
.styleMyShotsButton-bright .pageshot-myshots-button {
  color: #fff;
  background: #00AFF7; }

.styleMyShotsButton-bright .pageshot-pre-myshots,
.styleMyShotsButton-bright .pageshot-post-myshots {
  filter: brightness(20); }

/* end styleMyShotsButton test */
.pageshot-visible {
  pointer-events: all;
  top: 60px; }

.pageshot-full-page {
  pointer-events: all;
  top: 105px; }

.pageshot-pre-myshots {
  /* Data version of static/img/my-shots.svg */
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIwLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNEQ0RDREO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLDEyaDR2MmMwLDEuMS0wLjksMi0yLDJoLTJWMTJMMTIsMTJ6IE0wLDEyaDR2NEgyYy0xLjEsMC0yLTAuOS0yLTJWMTJMMCwxMnogTTEyLDZoNHY0aC00VjZMMTIsNnogTTYsNmg0djQKCUg2VjZMNiw2eiBNMCw2aDR2NEgwVjZMMCw2eiBNMTIsMGgyYzEuMSwwLDIsMC45LDIsMnYyaC00VjBMMTIsMHogTTYsMGg0djRINlYwTDYsMHogTTYsMTJoNHY0SDZWMTJMNiwxMnogTTAsMmMwLTEuMSwwLjktMiwyLTJoMgoJdjRIMFYyTDAsMnoiLz4KPC9zdmc+Cg==");
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  flex: 0 0 24px;
  height: 16px;
  width: 24px; }

.pageshot-post-myshots {
  /* Data version of static/img/arrow-right.svg */
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIwLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMzMzMzMzO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTUuNywyLjhMNS43LDIuOGMwLjQtMC40LDEuMS0wLjQsMS41LDBMMTIuNCw4bC01LjEsNS4yYy0wLjQsMC40LTEuMSwwLjQtMS41LDBsMCwwYy0wLjQtMC40LTAuNC0xLjEsMC0xLjUKCUw5LjQsOEw1LjcsNC4yQzUuMywzLjgsNS4zLDMuMiw1LjcsMi44eiIvPgo8L3N2Zz4K");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  flex: 0 0 20px;
  height: 16px;
  opacity: 0.6;
  width: 20px; }

.pageshot-myshots-text {
  flex: 0;
  position: relative;
  top: 1px; }

.pageshot-select-mode-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center; }

.pageshot-select-mode {
  position: relative;
  width: 380px;
  height: 200px;
  background-color: #fcfcfc;
  text-align: center;
  padding-top: 1.5em !important;
  padding-bottom: 1.5em !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 14px; }

.pageshot-select-mode-square-button {
  width: 90px;
  height: 90px;
  padding-top: 0.25em;
  box-sizing: border-box;
  border: 0;
  border-image-width: 0;
  cursor: pointer;
  background-color: #fcfcfc; }

.pageshot-select-mode-button {
  position: absolute;
  bottom: 0;
  width: 190px;
  height: 40px;
  padding-top: 0.25em;
  box-sizing: border-box;
  border: 0;
  border-image-width: 0;
  border-top: 1px solid #d4d4d4;
  background-color: #efefef;
  cursor: pointer; }

.pageshot-crosshair-pulse {
  position: fixed;
  top: 20%;
  left: 60%;
  margin-left: -20px;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 0, 0.5);
  z-index: 10000000999;
  background-image: radial-gradient(20px at 50% 50%, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.5));
  animation-name: pageshot-pulse;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: 20; }

.pageshot-crosshair-inner {
  position: fixed;
  top: 20%;
  left: 60%;
  margin-left: -4px;
  margin-top: -4px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10000000100; }

@keyframes pageshot-pulse {
  0% {
    transform: scale(1); }
  50% {
    transform: scale(1.06); }
  100% {
    transform: scale(1); } }

.pageshot-horizcross.pageshot-crosshair-preview {
  top: 20%; }

.pageshot-vertcross.pageshot-crosshair-preview {
  left: 60%; }

.pageshot-myshots-reminder {
  display: flex;
  position: fixed;
  z-index: 10000000019;
  top: -17px;
  left: 10px; }
  .pageshot-myshots-reminder.pageshot-myshots-reminder-chrome {
    top: 44px; }

.pageshot-panel * {
  box-sizing: border-box;
  text-align: start; }

.pageshot-myshots-reminder > .pageshot-panel {
  background-clip: padding-box;
  background-color: #fcfcfc;
  border: 1px solid rgba(24, 26, 27, 0.2);
  box-shadow: 0 3px 5px rgba(24, 26, 27, 0.1), 0 0 7px rgba(24, 26, 27, 0.1);
  box-sizing: content-box;
  color: #222426;
  cursor: default;
  display: flex;
  flex-direction: column;
  font: caption;
  margin: 2em auto 0.5em;
  padding: 0;
  position: relative;
  -moz-user-select: none; }

.pageshot-myshots-reminder > .pageshot-panel > .pageshot-panel-arrowUp {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AAABUklEQVR42p2STU6DQBSAn9ZSBFv8oVEwYdrUqtu2XsAT2Fbv0AU7woZFN5B0xYID9JhupCn1vWQ0L0AZ4+JbzAx83yMD3N65jRhidtKE6v2/iE8ZLYLvqUJKuRSeSdoMWrdUkSZ5i0k7iF6iUxeqBLbbLaxWK0iSpE6uSZnRd8QQX5ggs77jjWhPnmnlyHq9hizLII5jAN/3IQzDOnkHOTe9Sdd2xYjkeZ5/Hg6H/Xzx/oqRsSkmPQr9fA2PRFEEm80GIE3TY3KDBFxeFMUXQZG3+RIjgiLWsUgQBNAkt2x38EDy3W73Ky9HbEc8yohZFwH2p7Sr8vspn7wh8sQiOo8ALdhlmlxemVwduWQRjdwgFwZyQQ9U5WrkxcvI9ApdXenUQS4sPLhG+bgs/2fkhpzkpkCPqrY79FD+rJArI4vlxwsOOqCBKQK4ydmrReoId34DYcLiW8YxuloAAAAASUVORK5CYII=");
  background-position: 12px top;
  background-repeat: no-repeat;
  height: 14px;
  margin-top: -14px;
  pointer-events: none;
  position: absolute;
  width: 100%; }

.pageshot-myshots-reminder > .pageshot-panel > .pageshot-panel-section {
  display: flex;
  flex-direction: row; }

.pageshot-myshots-reminder > .pageshot-panel > .pageshot-panel-section-header {
  padding: 16px; }

.pageshot-myshots-reminder > .pageshot-panel > .pageshot-panel-section-header > .pageshot-text-section-list {
  font-size: 13px; }

@keyframes pageshot-fade-in {
  0% {
    opacity: 0; }
  100% {
    opacity: 1; } }

.pageshot-hover-highlight {
  animation: pageshot-fade-in 500ms forwards;
  opacity: 0;
  position: absolute;
  border: 1px dashed rgba(0, 175, 247, 0.5);
  pointer-events: none;
  z-index: 10000000000; }

.pageshot-saver {
  position: fixed;
  z-index: 10000000099;
  background-color: #fcfcfc;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  top: 0;
  left: 0;
  height: 40px;
  width: 100%;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4) inset; }
  .pageshot-saver a,
  .pageshot-saver a:visited,
  .pageshot-saver a:link,
  .pageshot-saver a:hover {
    color: #000;
    text-decoration: none; }
  .pageshot-saver .pageshot-save-help {
    display: inline-block;
    padding-top: 9px;
    padding-left: 10px;
    font-size: 13px; }
  .pageshot-saver .pageshot-save {
    border-radius: 4px;
    background: #0996f8;
    color: #fff;
    box-shadow: 0 0 10px #ff0;
    border: 1px solid #0675d3; }
  .pageshot-saver .pageshot-cancel {
    border-radius: 4px;
    color: #858585;
    background-color: #fcfcfc;
    border: 1px solid #d4d4d4; }

`;
null;

