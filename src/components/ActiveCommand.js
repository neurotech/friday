const jira = require("./JiraTools");
const ui = { jira };

module.exports = function createActiveCommand(fastn, app) {
  return fastn("templater", {
    data: fastn.binding("activeCommand"),
    template: function(model) {
      var component = ui[model.get("item.commandName")];
      if (component) {
        return component(fastn, app);
      }
    }
  });
};