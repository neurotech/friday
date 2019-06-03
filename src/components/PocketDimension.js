/*
  STATUSES:
  ---------
  ready
  loading
  error
  success
*/
const Stars = require("./Stars");

module.exports = function pocketDimensionComponent(fastn, app) {
  var paper = fastn("div", { class: "pocket-dimension-paper" });
  var url = fastn("input", {
    class: fastn.binding("componentData.status", status => ["pocket-dimension-url", status]),
    placeholder: fastn.binding("componentData.status", status => !status && "Please enter a link."),
    value: fastn.binding("filter", filter => {
      var pieces = filter.split(" ");
      if (pieces && typeof pieces === "object") {
        pieces = pieces.filter(Boolean);
        if (pieces.length >= 2) {
          var trimmed = pieces.slice(1);
          return trimmed;
        }
      }
    })
  }).attach(app.state);

  var paperContainer = fastn("div", { class: "pocket-dimension-paper-container" }, paper, url);
  var starfield = Stars();

  return fastn(
    "div",
    {
      class: "pocket-dimension-component-container"
    },
    paperContainer,
    starfield
  );
};
