const ui = {
  jira: require("./JiraTools"),
  vaporwave: require("./vaporwave"),
  pocketDimension: require("./PocketDimension"),
  clipboardHistory: require("./ClipboardHistory"),
  rightGIF: require("./RightGIF")
};

module.exports = function createActiveCommand(fastn, app) {
  return fastn("templater", {
    data: fastn.binding("activeCommand"),
    template: function(model) {
      var component = ui[model.get("item.componentName")];
      if (component) {
        return component(fastn, app);
      }
    }
  });
};
