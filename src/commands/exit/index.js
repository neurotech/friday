module.exports = {
  commandName: "exit",
  aliases: ["quit"],
  displayName: "Exit",
  detail: "Exit Friday.",
  logo: "exit",
  command: function exitFriday() {
    window.close();
  }
};
