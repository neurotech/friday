module.exports = function(fastn, state) {
  return {
    state: state,
    getActiveCommand: function() {
      var activeCommand = fastn.Model.get(state, "activeCommand");
      return activeCommand;
    },
    setFilteredCommandList: function(commands) {
      fastn.Model.set(state, "filteredCommandList", commands);
    },
    executeCommand: function() {
      var command = fastn.Model.get(state, "activeCommand");
      if (command) {
        var input = fastn.Model.get(state, "filter");
        command.command(input);
      }
    },
    expandCommand: function() {
      var commands = fastn.Model.get(state, "commands");
      if (commands !== null && commands.length >= 1) {
        var input = fastn.Model.get(state, "filter");
        var fullCommand = commands[0].commandName;
        if (input !== fullCommand) {
          fastn.Model.set(state, "filter", fullCommand + " ");
        }
        fastn.Model.set(state, "activeCommand", commands[0]);
      }
    }
  };
};
