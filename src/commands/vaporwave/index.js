const vaporwave = require("vaporwave");

module.exports = function vaporwaveText(app) {
  var vaporwaveCommand = {
    commandName: "vaporwave",
    aliases: ["vape"],
    displayName: "ｖａｐｏｒｗａｖｅ　ｔｅｘｔ",
    detail:
      "Transforms text into ｖａｐｏｒｗａｖｅ　ｔｅｘｔ and copies it to your clipboard.",
    logo: "stop",
    command: function vw(input) {
      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length >= 2) {
          var trimmed = input.slice(1);
          var transformed = vaporwave(trimmed.join(" "));
          require("electron").clipboard.writeText(transformed);
          app.setComponentData({ copiedToClipboard: true });

          var chimes = new Audio("./sounds/chimes.wav");
          chimes.play();
        }
      }
    },
    followup: function clear() {
      app.clearActiveCommand();
      app.clearComponentData();
      app.clearFilter();
    }
  };

  return vaporwaveCommand;
};
