module.exports = function createCommandItem(fastn, app) {
  return fastn(
    "div",
    {
      class: fastn.binding(
        "item",
        app.selectedCommandBinding,
        function(item, selectedCommand) {
          return [
            "command",
            item === selectedCommand ? "selected" : "not-selected"
          ];
        }
      )
    },
    fastn.binding("item.displayName")
  );
};
