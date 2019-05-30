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

  var copyStatus = fastn(
    "div",
    {
      class: "vaporwave-copy-status",
      hidden: fastn.binding(
        "componentData.copiedToClipboard",
        copied => !copied
      )
    },
    "~ Copied ~"
  ).attach(app.state);

  return fastn(
    "div",
    {
      class: "vaporwave-component-container"
    },
    vaporwaveText,
    copyStatus
  );
};
