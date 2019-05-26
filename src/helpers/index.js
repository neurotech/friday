module.exports = function(fastn, state) {

  var selectedCommandBinding = fastn.binding('selectedCommand').attach(state);

  var filteredCommandsBinding = fastn
    .binding("commands|*", "filter", (commands, filter) =>
      commands.filter(command =>
        command.commandName.match(new RegExp(filter, "i"))
      )
    )
    .on('change', filteredCommands => {
      if(filteredCommands && !~filteredCommands.indexOf(selectedCommandBinding())){
            selectedCommandBinding(filteredCommands[0]);
        }
    })
    .attach(state);

  return {
    filteredCommandsBinding,
    selectedCommandBinding,
    state: state,
    getActiveCommand: function() {
      return selectedCommandBinding();
    },
    setFilteredCommandList: function(commands) {
      fastn.Model.set(state, "filteredCommandList", commands);
    },
    executeCommand: function() {
      var command = selectedCommandBinding();
      if (command) {
        command.command(state.filter);
      }
    },
    expandCommand: function() {
      var selectedCommand = selectedCommandBinding();
      if (selectedCommand) {
        var input = fastn.Model.get(state, "filter");
        var fullCommand = selectedCommand.commandName;
        if (input !== fullCommand) {
          fastn.Model.set(state, "filter", fullCommand + " ");
        }
      }
    }
  };
};
