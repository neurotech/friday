module.exports = function createCommandItem(fastn, app) {
  return fastn(
    "div",
    {
      class: fastn.binding(
        "item",
        fastn.binding("selectedCommand").attach(app.state),
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
