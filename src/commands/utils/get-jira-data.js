const Store = require("electron-store");
const cpjax = require("cpjax");
const store = new Store();

let jiraURL = store.get("jiraUrl");
let username = store.get("jiraUsername");
let password = store.get("jiraPassword");

module.exports = function getJiraData(key, callback) {
  cpjax(
    {
      url: `${jiraURL}rest/api/3/search?jql=key="DEV-${key}"&fields=key,summary,status`,
      auth: "Basic " + Buffer.from(username + ":" + password, "utf8").toString("base64"),
    },
    function (err, data) {
      if (err) return callback(err);
      let parsed = JSON.parse(data);
      let issue = parsed.issues[0];
      var key = issue.key;
      var summary = issue.fields.summary.trim();
      var status = issue.fields.status.name;
      var url = `${jiraURL}browse/${key}`;

      let result = {
        key: key,
        summary: summary,
        status: status,
        combined: key + " - " + summary,
        markdown: `\`${key} - ${summary}\` (${url})`,
        url: url,
      };
      return callback(null, result);
    }
  );
};
