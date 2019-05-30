const tiny = require("tiny-json-http");

var post = function postToPocketDimension(url, callback) {
  // TODO: Flesh out
  var token = store.get("pocketDimensionToken");

  return url;
};

module.exports = function getJiraCommand(app) {
  var pocketDimensionCommand = {
    commandName: "pocket-dimension",
    aliases: ["pocket", "pd", "link"],
    displayName: "Pocket Dimension",
    detail: "Creates a new link post on Pocket Dimension.",
    logo: "pocket-dimension",
    command: function postLink(input) {
      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length === 2) {
          var url = input[1];

          post(url, function(err, res) {
            if (err) {
              return console.error(err);
            }
            app.setComponentData(res);

            // Replace this with a different sound:
            var chimes = new Audio("./sounds/chimes.wav");
            chimes.play();
          });
        }
      }
    },
    followup: function openIssueInBrowser() {
      var componentData = app.getComponentData();
      if (componentData) {
        app.clearActiveCommand();
        app.clearComponentData();
        app.clearFilter();
      }
    }
  };

  return pocketDimensionCommand;
};
