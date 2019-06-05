const domComponents = require("fastn/domComponents");
const fastn = require("fastn")(domComponents());
const helpers = require("./helpers");
const Alert = require("./components/Alert");
const SearchBar = require("./components/SearchBar");
const CommandList = require("./components/CommandList");
const ActiveCommand = require("./components/ActiveCommand");

window.addEventListener("load", function onLoad() {
  var state = {
    filter: "",
    commands: [],
    clipboardHistory: []
  };

  var app = helpers(fastn, state);

  var ipc = require("electron").ipcRenderer;

  ipc.on("clear-state", function() {
    app.clearActiveCommand();
    app.clearComponentData();
    app.clearFilter();
  });

  ipc.on("config-validation", function(event, valid) {
    app.setConfigValid(valid);
    if (!valid) {
      app.setAlertMessage("Invalid config!");
    }
  });

  ipc.on("clipboard-update", function(event, history) {
    var sorted = [...history];
    sorted.sort(function compare(a, b) {
      var dateA = a.epoch;
      var dateB = b.epoch;
      return dateB - dateA;
    });
    app.setClipboardHistory(sorted);
    app.setComponentData(sorted);
    app.selectedClipboardHistoryItemBinding(sorted[0]);
  });

  const view = fastn(
    "div",
    { class: "container" },
    Alert(fastn, app),
    SearchBar(fastn, app),
    CommandList(fastn, app),
    ActiveCommand(fastn, app)
  );
  view.attach(state);
  view.render();

  document.getElementById("app").appendChild(view.element);
});
