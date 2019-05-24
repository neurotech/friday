const fastn = require("fastn")(require("fastn/domComponents")());

window.addEventListener("load", function() {
  var state = {};
  var app = {};
  const view = fastn("div", { class: "container" }, "Friday");
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
