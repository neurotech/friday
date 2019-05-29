const exit = require("./exit");
const jira = require("./jira");
const shutdown = require("./shutdown");

module.exports = function generateCommands(app) {
  var commands = [exit, jira(app), shutdown];
  return commands;
};
