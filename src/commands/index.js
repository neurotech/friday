module.exports = function generateCommands() {
  var commands = [
    {
      commandName: "jira",
      displayName: "Get JIRA issue details as Markdown",
      detail:
        "Search JIRA for a DEV issue number, get it's summary & URL, then combine into Markdown.",
      command: function getIssue(issue) {
        console.log("You searched for: " + issue);
      }
    },
    {
      commandName: "something else",
      displayName: "aaaaaaaaaaa",
      detail: "bbbbbbbbbbbbbbbbbb",
      command: function getIssue(issue) {
        console.log("You searched for: " + issue);
      }
    }
  ];
  return commands;
};
