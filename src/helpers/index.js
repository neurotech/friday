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
  var getActiveCommand = function() {
    var activeCommand = fastn.Model.get(state, "activeCommand");
    return activeCommand;
  };
  var clearActiveCommand = function() {
    fastn.Model.remove(state, "activeCommand");
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
  var executeCommand = function() {
    expandCommand();
    var command = state.activeCommand;
    var componentData = fastn.binding("componentData");
    if (componentData) {
      if (typeof command.followup === "function") {
        command.followup();
      }
    }
    if (command) {
      var pieces = state.filter.split(" ");
      command.command(pieces);
    }
  };

  var helpers = {
    selectedCommandBinding,
    state,
    getActiveCommand,
    clearActiveCommand,
    clearFilter,
    setFilteredCommandList,
    getComponentData,
    setComponentData,
    clearComponentData,
    executeCommand,
    expandCommand
  };

  helpers.state.commands = Commands(helpers);

  helpers.filteredCommandsBinding = fastn
    .binding("commands|*", "filter", (commands, filter) => {
      if (!commands || !filter) {
        return [];
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
      if (
        filteredCommands &&
        !~filteredCommands.indexOf(selectedCommandBinding())
      ) {
        selectedCommandBinding(filteredCommands[0]);
      }
    })
    .attach(state);

  return helpers;
};
