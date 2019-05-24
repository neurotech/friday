const fastn = require("fastn")(require("fastn/domComponents")());

var deleteMe = fastn("input", {
  placeholder: "Search",
  class: "search",
  value: fastn.binding("filter"),
  oninput: "value:value",
  type: "text"
}).on("submit", event => {
  event.preventDefault();
});

var deleteMeResults = fastn("list", {
  class: "results",
  items: fastn.binding("results", "filter", (results, filter) => {
    var results = results;

    if (!results) {
      return;
    }

    if (!filter) {
      return;
    }

    if (filter) {
      results = results.filter(item => ~item.indexOf(filter.toLowerCase()));
    }

    return results;
  }),
  template: function() {
    return fastn("div", { class: "result" }, fastn.binding("item"));
  }
});

window.addEventListener("load", function() {
  var state = {
    results: [
      "Atocgib",
      "Jemica",
      "Avigkas",
      "Gofmuref",
      "Cimizto",
      "Betaleze",
      "Mofeti",
      "Egowunwup",
      "Ipouvnus",
      "Hodcime"
    ]
  };
  var app = {};
  const view = fastn("div", { class: "container" }, deleteMe, deleteMeResults);
  view.attach(state);
  view.render();

  const mount = document.getElementById("app");
  mount.appendChild(view.element);
});
