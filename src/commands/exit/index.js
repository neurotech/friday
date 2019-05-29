module.exports = {
  commandName: "exit",
  aliases: ["quit"],
  displayName: "Exit",
  detail: "Exit Friday.",
  logo: "stop",
  command: function exitFriday() {
    window.close();
  }
};
