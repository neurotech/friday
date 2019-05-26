const CommandItem = require("./CommandItem");

module.exports = function createCommandList(fastn, app) {
  return fastn("list", {
    class: "command-list",
    items: fastn.binding(
      "commands|*",
      "filter",
      "activeCommand",
      (commands, filter, activeCommand) => {
        if (!commands || !filter) {
          return;
        }

        // if (activeCommand) {
        //   if (filter.trim().startsWith(activeCommand.commandName)) {
        //     return [activeCommand];
        //   }
        // }

        if (filter) {
          commands = commands.filter(
            item =>
              ~item.commandName
                .toLowerCase()
                .indexOf(filter.toLowerCase().trim())
          );
        }

        return commands;
      }
    ),
    template: function() {
      return CommandItem(fastn, app);
    }
  });
};
