const Store = require("electron-store");

module.exports = {
  initialise: function initialise() {
    const config = new Store({
      defaults: {
        jiraUrl: null,
        jiraUsername: null,
        jiraPassword: null,
        pocketDimensionToken: null
      }
    });

    var configState = config.store;
    var configValues = Object.values(configState);

    var configValid = !configValues.includes(null);

    return configValid;
  }
};
