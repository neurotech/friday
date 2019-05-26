const CommandItem = require("./CommandItem");

module.exports = function createCommandList(fastn, app) {
  var selectedCommandBinding = fastn
    .binding("selectedCommand")
    .attach(app.state);
  var filteredCommandsBinding = fastn
    .binding("commands|*", "filter", (commands, filter) =>
      commands.filter(command =>
        command.commandName.match(new RegExp(filter, "i"))
      )
    )
    .on("change", filteredCommands => {
      if (
        filteredCommands &&
        !~filteredCommands.indexOf(selectedCommandBinding())
      ) {
        selectedCommandBinding(filteredCommands[0]);
      }
    })
    .attach(app.state);

  return fastn("list", {
    class: "command-list",
    items: app.filteredCommandsBinding,
    template: function() {
      return CommandItem(fastn, app);
    }
  });
};

//   return fastn("list", {
//     class: "command-list",
//     items: fastn.binding(
//       "commands|*",
//       "filter",
//       "activeCommand",
//       (commands, filter, activeCommand) => {
//         if (!commands || !filter) {
//           return;
//         }

//         // if (activeCommand) {
//         //   if (filter.trim().startsWith(activeCommand.commandName)) {
//         //     return [activeCommand];
//         //   }
//         // }

//         if (filter) {
//           commands = commands.filter(
//             item =>
//               ~item.commandName
//                 .toLowerCase()
//                 .indexOf(filter.toLowerCase().trim())
//           );
//         }

//         return commands;
//       }
//     ),
//     template: function() {
//       return CommandItem(fastn, app);
//     }
//   });
// };
