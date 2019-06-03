const vaporwave = require("vaporwave");

module.exports = function vaporwaveComponent(fastn, app) {
  var vaporwaveText = fastn(
    "div",
    {
      class: "vaporwave-text"
    },
    fastn.binding("filter", filter => {
      var pieces = filter.split(" ");
      if (pieces && typeof pieces === "object") {
        pieces = pieces.filter(Boolean);
        if (pieces.length >= 2) {
          var trimmed = pieces.slice(1);
          return vaporwave(trimmed.join(" "));
        } else {
          return "⠀";
        }
      }
    })
  ).attach(app.state);

  var vaporwaveIconWindowsUpdate = fastn("img", {
    src: "./images/windows-update.png",
    class: "vaporwave-window-wupdate-icon"
  });
  var vaporwaveTitleText = fastn("img", { src: "./images/vaporwave-2000.png", class: "vaporwave-window-title-text" });
  var vaporwaveTitleBarLeft = fastn(
    "div",
    { class: "vaporwave-window-titlebar-left" },
    vaporwaveIconWindowsUpdate,
    vaporwaveTitleText
  );
  var vaporwaveIconClose = fastn("img", {
    src: "./images/close.png",
    class: "vaporwave-close-icon"
  });
  var vaporwaveWindowTitleBar = fastn(
    "div",
    { class: "vaporwave-window-titlebar" },
    vaporwaveTitleBarLeft,
    vaporwaveIconClose
  );
  var vaporwaveWindow = fastn("div", { class: "vaporwave-window" }, vaporwaveWindowTitleBar, vaporwaveText);

  var copyStatus = fastn(
    "div",
    {
      class: "vaporwave-copy-status",
      hidden: fastn.binding("componentData.copiedToClipboard", copied => !copied)
    },
    "~ Copied ~"
  ).attach(app.state);

  return fastn(
    "div",
    {
      class: "vaporwave-component-container"
    },
    vaporwaveWindow,
    copyStatus
  );
};
