const domComponents = require("fastn/domComponents");
const fastn = require("fastn")(domComponents());
const helpers = require("./helpers");
const SearchBar = require("./components/SearchBar");
const CommandList = require("./components/CommandList");
const Commands = require("./commands");

import "normalize.css";

window.addEventListener("load", function onLoad() {
  var state = {
    commands: Commands(),
    activeCommand: null,
    selectedCommand: null,
    filter: ""
  };
  var app = helpers(fastn, state);
  const view = fastn(
    "div",
    { class: "container" },
    SearchBar(fastn, app),
    CommandList(fastn, app)
  );
  view.attach(state);
  view.render();

  document.getElementById("app").appendChild(view.element);
});
