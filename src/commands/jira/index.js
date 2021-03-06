const getJiraData = require("../utils/get-jira-data");

module.exports = function getJiraCommand(app) {
  var jiraCommand = {
    commandName: "jira",
    componentName: "jira",
    aliases: ["jr", "jra"],
    displayName: "Get JIRA issue details as Markdown",
    detail: "Search JIRA for a DEV issue number, get it's summary & URL, then combine into Markdown.",
    logo: "jira",
    command: function getIssue(input) {
      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length === 2) {
          var issueKey = input[1].replace(/\D/g, "");

          getJiraData(issueKey, function(err, res) {
            if (err) {
              return console.error(err);
            }
            if (res) {
              app.setComponentData(res);
              require("electron").clipboard.writeText(res.markdown);
            }
          });
        }
      }
    },
    followup: function openIssueInBrowser() {
      var componentData = app.getComponentData();
      if (componentData) {
        var url = componentData.url;
        app.clearActiveCommand();
        app.clearComponentData();
        app.clearFilter();
        require("electron").shell.openExternal(url);
      }
    }
  };

  return jiraCommand;
};
