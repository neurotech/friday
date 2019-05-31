module.exports = function pocketDimensionComponent(fastn, app) {
  var status = fastn(
    "div",
    {
      class: fastn.binding("componentData.status", status => ["pocket-dimension-status", status])
    },
    fastn.binding("componentData.status", status => (status ? status : "Please enter a link to save."))
  ).attach(app.state);

  return fastn(
    "div",
    {
      class: "pocket-dimension-component-container"
    },
    status
  );
};
