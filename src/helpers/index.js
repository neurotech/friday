const Commands = require("../commands");

module.exports = function(fastn, state) {
  var selectedCommandBinding = fastn.binding("selectedCommand").attach(state);

  var helpers = {
    selectedCommandBinding,
    state: state,
    getActiveCommand: function() {
      var activeCommand = fastn.Model.get(state, "activeCommand");
      return activeCommand;
    },
    clearActiveCommand: function() {
      fastn.Model.remove(state, "activeCommand");
    },
    clearFilter: function() {
      fastn.Model.remove(state, "filter");
    },
    setFilteredCommandList: function(commands) {
      fastn.Model.set(state, "filteredCommandList", commands);
    },
    setComponentData: function(data) {
      fastn.Model.set(state, "componentData", data);
    },
    executeCommand: function() {
      var command = state.activeCommand;
      if (command) {
        var pieces = state.filter.split(" ");
        command.command(pieces);
      }
    },
    expandCommand: function() {
      var selectedCommand = selectedCommandBinding();
      if (selectedCommand) {
        var input = fastn.Model.get(state, "filter");
        var fullCommand = selectedCommand.commandName;
        if (input !== fullCommand + " ") {
          fastn.Model.set(state, "filter", fullCommand + " ");
          fastn.Model.set(state, "activeCommand", selectedCommand);
        }
      }
    }
  };

  helpers.state.commands = Commands(helpers);

  helpers.filteredCommandsBinding = fastn
    .binding("commands|*", "filter", (commands, filter) => {
      if (!commands || !filter) {
        return [];
      }
      return commands.filter(command =>
        command.commandName.match(new RegExp(filter, "i"))
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
