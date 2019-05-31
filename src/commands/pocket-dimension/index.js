const cpjax = require("cpjax");
const Store = require("electron-store");
const store = new Store();

var pocketDimensionUrl = store.get("pocketDimensionUrl");
var pocketDimensionToken = store.get("pocketDimensionToken");

var post = function postToPocketDimension(url, callback) {
  cpjax(
    {
      url: pocketDimensionUrl + "api/items/create",
      method: "POST",
      auth: `Bearer ${pocketDimensionToken}`,
      data: JSON.stringify({ body: url, generateTitle: true })
    },
    function(err, res) {
      if (err) callback(err);
      callback(null, res);
    }
  );
};

module.exports = function getJiraCommand(app) {
  var pocketDimensionCommand = {
    commandName: "pocket-dimension",
    componentName: "pocketDimension",
    aliases: ["pocket", "pd", "link"],
    displayName: "Pocket Dimension",
    detail: "Creates a new link post on Pocket Dimension.",
    logo: "pocket-dimension",
    command: function postLink(input) {
      app.setComponentData({ status: "ready" });

      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length === 2) {
          var url = input[1];
          app.setComponentData({ status: "loading" });

          post(url, function(err, res) {
            if (err && !res) {
              app.setComponentData({ status: "error" });
              return console.error(err);
            }

            if (res && !err) {
              app.setComponentData({ status: "success" });

              var chimes = new Audio("./sounds/link-saved.wav");
              chimes.play();
            }
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
