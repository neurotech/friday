const jira = require("./JiraTools");
const vaporwave = require("./vaporwave");
const pocketDimension = require("./PocketDimension");
const clipboardHistory = require("./ClipboardHistory");
const ui = { jira, vaporwave, pocketDimension, clipboardHistory };

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
