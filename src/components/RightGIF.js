module.exports = function rightGIFComponent(fastn, app) {
  var imageElement = fastn("img", {
    hidden: fastn.binding("componentData.url", url => !url),
    class: fastn.binding("componentData.url", url => url && "fadein"),
    src: fastn.binding("componentData.url", url => (url ? url : ""))
  }).attach(app.state);

  var gif = fastn(
    "div",
    {
      class: "rightgif-image"
    },
    imageElement
  );

  return fastn(
    "div",
    {
      class: "rightgif-component-container"
    },
    gif
  );
};
