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
      // Get list of clipboard history items from Main process, then:
      // app.setComponentData(items)

      app.setComponentData(app.state.mockClipboard);
    },
    command: function copyHistoryItem(input) {
      require("electron").clipboard.writeText(input);

      // Replace this with a new sound:
      var chimes = new Audio("./sounds/chimes.wav");
      chimes.play();
    },
    // Should followup() clear out the filter, etc?
    followup: null
  };

  return clipboardHistoryCommand;
};
