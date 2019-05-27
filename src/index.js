const domComponents = require("fastn/domComponents");
const fastn = require("fastn")(domComponents());
const helpers = require("./helpers");
const SearchBar = require("./components/SearchBar");
const CommandList = require("./components/CommandList");
const ActiveCommand = require("./components/ActiveCommand");

window.addEventListener("load", function onLoad() {
  var state = {
    filter: "",
    commands: []
  };

  var app = helpers(fastn, state);

  const view = fastn(
    "div",
    { class: "container" },
    SearchBar(fastn, app),
    CommandList(fastn, app),
    ActiveCommand(fastn, app)
  );
  view.attach(state);
  view.render();

  document.getElementById("app").appendChild(view.element);
});
