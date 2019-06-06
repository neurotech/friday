const getRightGIF = require("../utils/get-rightgif");

module.exports = function getRightGIFCommand(app) {
  var rightGIFCommand = {
    commandName: "gif",
    componentName: "rightGIF",
    aliases: ["rg", "rightgif"],
    displayName: "RightGIF",
    detail: "Find the right GIF, every time!",
    logo: "rightgif",
    command: function postToRightGIF(input) {
      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length >= 2) {
          var cloned = [...input];
          var trimmed = cloned.slice(1, cloned.length);
          app.setComponentData({ status: "loading" });
          getRightGIF(trimmed.join(" "), function(err, res) {
            if (err) {
              app.setComponentData({ status: "error" });
              return console.error(err);
            }
            if (res) {
              app.setComponentData({ status: "success", url: res });
            }
          });
        }
      }
    },
    followup: function copyLink() {
      var componentData = app.getComponentData();
      if (componentData) {
        var clipboard = require("electron").clipboard;
        var currentWindow = require("electron").remote.getCurrentWindow();
        var url = componentData.url;
        app.clearActiveCommand();
        app.clearComponentData();
        app.clearFilter();
        clipboard.writeText(url);
        currentWindow.minimize();
      }
    }
  };

  return rightGIFCommand;
};
