const CommandItem = require("./CommandItem");

module.exports = function createCommandList(fastn, app) {
  return fastn("list", {
    class: "command-list",
    hidden: fastn.binding("filter", filter => !filter),
    items: app.filteredCommandsBinding,
    template: function() {
      return CommandItem(fastn, app);
    }
  });
};
