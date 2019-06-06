module.exports = function rightGIFComponent(fastn, app) {
  var imageElement = fastn("img", {
    hidden: fastn.binding("componentData.url", url => !url),
    class: fastn.binding("componentData.url", url => url && "fadein"),
    src: fastn.binding("componentData.url", url => (url ? url : ""))
  }).attach(app.state);

  var gif = fastn(
    "div",
    {
      class: fastn.binding("componentData.status", status => ["rightgif-image", status])
    },
    imageElement
  ).attach(app.state);

  return fastn(
    "div",
    {
      class: "rightgif-component-container"
    },
    gif
  );
};
