const jira = require("./jira");
const vaporwave = require("./vaporwave");
const exit = require("./exit");
const shutdown = require("./shutdown");

module.exports = function generateCommands(app) {
  var commands = [jira(app), vaporwave(app), exit, shutdown];
  return commands;
};
