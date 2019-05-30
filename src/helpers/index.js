const find = require("lodash.find");
const Commands = require("../commands");

module.exports = function(fastn, state) {
  var selectedCommandBinding = fastn.binding("selectedCommand").attach(state);
  var expandCommand = function() {
    var selectedCommand = selectedCommandBinding();
    if (selectedCommand) {
      var input = fastn.Model.get(state, "filter");
      var fullCommand = selectedCommand.commandName;
      if (input !== fullCommand + " ") {
        fastn.Model.set(state, "filter", fullCommand + " ");
        fastn.Model.set(state, "activeCommand", selectedCommand);
      }
    }
  };
  var setConfigValid = function(isValid) {
    fastn.Model.set(state, "configValid", isValid);
  };
  var setAlertMessage = function(message) {
    fastn.Model.set(state, "alertMessage", message);
  };
  var clearAlertMessage = function() {
    fastn.Model.remove(state, "alertMessage");
  };
  var getActiveCommand = function() {
    var activeCommand = fastn.Model.get(state, "activeCommand");
    return activeCommand;
  };
  var clearActiveCommand = function() {
    fastn.Model.remove(state, "activeCommand");
  };
  var getFilterValue = function() {
    var filter = fastn.Model.get(state, "filter");
    return filter;
  };
  var clearFilter = function() {
    fastn.Model.remove(state, "filter");
  };
  var setFilteredCommandList = function(commands) {
    fastn.Model.set(state, "filteredCommandList", commands);
  };
  var getComponentData = function() {
    var componentData = fastn.Model.get(state, "componentData");
    return componentData;
  };
  var setComponentData = function(data) {
    fastn.Model.set(state, "componentData", data);
  };
  var clearComponentData = function() {
    fastn.Model.remove(state, "componentData");
  };
  var renderLargeText = function(text) {
    var { BrowserWindow } = require("electron").remote;
    var path = require("path");
    let largeTextWindow = new BrowserWindow({
      show: false,
      // width: 800,
      // height: 800,
      fullscreen: true,
      backgroundColor: null,
      frame: false,
      resizable: false,
      transparent: true,
      center: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    largeTextWindow.on("close", () => {
      largeTextWindow = null;
    });
    largeTextWindow.loadURL(path.join(__dirname, `../large-text/index.html?largeText=${text}`));
    largeTextWindow.show();
  };
  var executeCommand = function() {
    expandCommand();
    var command = state.activeCommand;
    var componentData = state.componentData;
    if (command) {
      var pieces = state.filter.split(" ");
      command.command(pieces);
    }
    if (componentData) {
      if (typeof command.followup === "function") {
        command.followup();
      }
    }
  };

  var helpers = {
    selectedCommandBinding,
    state,
    setConfigValid,
    setAlertMessage,
    clearAlertMessage,
    getActiveCommand,
    clearActiveCommand,
    getFilterValue,
    clearFilter,
    setFilteredCommandList,
    getComponentData,
    setComponentData,
    clearComponentData,
    renderLargeText,
    executeCommand,
    expandCommand
  };

  helpers.state.commands = Commands(helpers);

  helpers.filteredCommandsBinding = fastn
    .binding("commands|*", "filter", (commands, filter) => {
      if (!commands || !filter) {
        return [];
      }
      if (filter === "*") {
        return commands;
      }
      return commands.filter(
        command =>
          command.commandName.match(new RegExp(filter, "i")) ||
          find(command.aliases, function(alias) {
            return alias.match(new RegExp(filter, "i"));
          })
      );
    })
    .on("change", filteredCommands => {
      if (filteredCommands && !~filteredCommands.indexOf(selectedCommandBinding())) {
        selectedCommandBinding(filteredCommands[0]);
      }
    })
    .attach(state);

  return helpers;
};
