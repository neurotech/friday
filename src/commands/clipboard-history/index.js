module.exports = function getClipboardHistoryCommand(app) {
  var clipboardHistoryCommand = {
    commandName: "clipboard",
    componentName: "clipboardHistory",
    aliases: ["copy", "ch"],
    displayName: "Clipboard History",
    detail: "Browse your clipboard history.",
    logo: "clipboard",
    isNavigable: true,
    initialise: function initialiseClipboardHistoryCommand() {
      app.setComponentData(app.state.clipboardHistory);
    },
    command: function copyHistoryItem(input) {
      var clipboard = require("electron").clipboard;
      var chimes = new Audio("./sounds/screenshot.wav");
      var currentWindow = require("electron").remote.getCurrentWindow();

      clipboard.writeText(input.fullText);
      chimes.play();
      currentWindow.minimize();

      app.clearActiveCommand();
      app.clearComponentData();
      app.clearFilter();
    },
    followup: null
  };

  return clipboardHistoryCommand;
};
