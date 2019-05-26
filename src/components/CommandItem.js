module.exports = function createCommandItem(fastn, app) {
  return fastn(
    "div",
    {
      class: fastn.binding("item.isSelected", function(isSelected) {
        return ["command", isSelected === true ? "selected" : "not-selected"];
      })
    },
    fastn.binding("item.isSelected"),
    " - ",
    fastn.binding("item.displayName"),
    " - ",
    fastn.binding("item.detail")
  );
};
