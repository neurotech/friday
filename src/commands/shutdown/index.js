const shutdown = require("electron-shutdown-command");

module.exports = {
  commandName: "shutdown",
  aliases: ["power", "turn"],
  displayName: "Shut Down",
  detail: "Shut down your computer.",
  logo: "stop",
  command: function shutDown() {
    shutdown.shutdown({
      force: false,
      timerseconds: 2,
      debug: process.env.NODE_ENV === "development"
    });
  }
};
