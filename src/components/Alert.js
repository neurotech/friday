module.exports = function createAlert(fastn, app) {
  return fastn(
    "div",
    {
      class: "alert",
      hidden: fastn.binding("alertMessage", message => !message)
    },
    fastn.binding("alertMessage")
  );
};
