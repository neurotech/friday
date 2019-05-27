const getJiraData = require("./tools/get-jira-data");

module.exports = function generateCommands(app) {
  var commands = [
    {
      commandName: "exit",
      aliases: ["quit"],
      displayName: "Exit",
      detail: "Exit Friday.",
      logo: "stop",
      command: function exitFriday() {
        window.close();
      }
    },
    {
      commandName: "shutdown",
      aliases: ["power", "turn"],
      displayName: "Shut Down",
      detail: "Shut down your computer.",
      logo: "stop",
      command: function shutDown() {
        console.error("SHUTTING DOWN! REPLACE ME!");
      }
    },
    {
      commandName: "jira",
      aliases: ["jr", "jra"],
      displayName: "Get JIRA issue details as Markdown",
      detail:
        "Search JIRA for a DEV issue number, get it's summary & URL, then combine into Markdown.",
      logo: "jira",
      command: function getIssue(input) {
        if (input && typeof input === "object") {
          input = input.filter(Boolean);
          if (input.length === 2) {
            var issueKey = input[1].replace(/\D/g, "");

            getJiraData(issueKey, function(err, res) {
              if (err) {
                console.error(err);
              }
              app.setComponentData(res);
              require("electron").clipboard.writeText(res.markdown);
            });
          }
        }
      },
      followup: function openIssueInBrowser() {
        var componentData = app.getComponentData();
        if (componentData) {
          require("electron").shell.openExternal(componentData.url);
        }
      }
    }
  ];
  return commands;
};
