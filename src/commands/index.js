const getJiraData = require("./tools/get-jira-data");

module.exports = function generateCommands(app) {
  var commands = [
    {
      commandName: "exit",
      displayName: "Exit",
      detail: "Exit Friday.",
      command: function exitFriday() {
        window.close();
      }
    },
    {
      commandName: "shutdown",
      displayName: "Shut Down",
      detail: "Shut down your computer.",
      command: function shutDown() {
        console.error("SHUTTING DOWN! REPLACE ME!");
      }
    },
    {
      commandName: "jira",
      displayName: "Get JIRA issue details as Markdown",
      detail:
        "Search JIRA for a DEV issue number, get it's summary & URL, then combine into Markdown.",
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
            });
          }
        }
      }
    }
  ];
  return commands;
};
