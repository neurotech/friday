module.exports = function(fastn, state) {
  return {
    getActiveCommand: function() {
      var activeCommand = fastn.Model.get(state, "activeCommand");
      return activeCommand;
    },
    setFilteredCommandList: function(commands) {
      fastn.Model.set(state, "filteredCommandList", commands);
    },
    setSelectedItem: function(index) {
      var commands = fastn.Model.get(state, "commands");
      var currentIndex = fastn.Model.get(state, "selectedItemIndex");

      if (!currentIndex) {
        fastn.Model.set(state, "selectedItemIndex", 0);
        currentIndex = 0;
      }

      if (typeof index === "string") {
        commands[currentIndex].isSelected = false;
        switch (index) {
          case "prev":
            if (currentIndex === 0) {
              index = commands.length - 1;
            } else {
              index = currentIndex - 1;
            }
            break;
          case "next":
            if (currentIndex === commands.length - 1) {
              index = 0;
            } else {
              index = currentIndex + 1;
            }
            break;

          default:
            break;
        }
      }

      if (typeof index === "number") {
        fastn.Model.set(state, "selectedItemIndex", index);
        commands[index].isSelected = true;
        fastn.Model.set(state, "commands", commands);
      }
    },
    executeCommand: function() {
      var command = fastn.Model.get(state, "filteredCommandList");
      var input = fastn.Model.get(state, "filter");
      if (command !== null && command.length >= 1) {
        command[0].command(input);
      }
    },
    expandCommand: function() {
      var command = fastn.Model.get(state, "filteredCommandList");
      var input = fastn.Model.get(state, "filter");
      if (command !== null && command.length >= 1) {
        var fullCommand = command[0].commandName;
        if (input !== fullCommand) {
          fastn.Model.set(state, "filter", fullCommand + " ");
        }
        fastn.Model.set(state, "activeCommand", command[0]);
      }
    }
  };
};
