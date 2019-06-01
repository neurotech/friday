module.exports = function createCommandItem(fastn, app) {
  var logo = fastn("div", {
    class: "command-logo",
    style: fastn.binding("item.logo", logo => {
      return `background-image:url(images/icon-${logo}.png);`;
    })
  });
  var displayName = fastn("div", { class: "command-display-name" }, fastn.binding("item.displayName"));
  var detail = fastn("div", { class: "command-detail" }, fastn.binding("item.detail"));
  return fastn(
    "div",
    {
      class: fastn.binding("item", app.selectedCommandBinding, function(item, selectedCommand) {
        return ["command", item === selectedCommand ? "selected" : "not-selected"];
      })
    },
    logo,
    displayName,
    detail
  );
};
