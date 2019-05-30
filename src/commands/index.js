const jira = require("./jira");
const vaporwave = require("./vaporwave");
const pocketDimension = require("./pocket-dimension");
const exit = require("./exit");
const shutdown = require("./shutdown");

module.exports = function generateCommands(app) {
  var commands = [jira(app), vaporwave(app), pocketDimension(app), exit, shutdown];
  return commands;
};
