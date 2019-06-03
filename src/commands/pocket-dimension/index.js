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
      data: JSON.stringify({ type: "link", body: url, generateTitle: true })
    },
    function(err, res) {
      if (err) callback(err);
      callback(null, res);
    }
  );
};

// Thanks to: https://stackoverflow.com/a/43467144
var isValidUrl = string => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
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
      if (input && typeof input === "object") {
        input = input.filter(Boolean);
        if (input.length === 2) {
          var url = input[1];
          if (isValidUrl(url)) {
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

                setTimeout(function waitForIt() {
                  app.clearActiveCommand();
                  app.clearComponentData();
                  app.clearFilter();
                }, 2500);
              }
            });
          } else {
            app.setComponentData({ status: "error" });
          }
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
