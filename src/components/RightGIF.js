module.exports = function rightGIFComponent(fastn, app) {
  var loadingText = fastn(
    "div",
    { hidden: fastn.binding("componentData.url", url => url), class: "rightgif-loading-text" },
    fastn.binding("componentData.status", status => {
      if (!status) {
        return "Enter a search term to find the right GIF.";
      }
      if (status === "loading") {
        return "Getting the right GIF...";
      }
      if (status === "error") {
        return "Encountered an error trying to find your GIF.";
      }
    })
  );

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
    loadingText,
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
