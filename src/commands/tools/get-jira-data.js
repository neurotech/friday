const cpjax = require("cpjax");

let jiraURL = process.env.JIRA_URL;
let username = process.env.JIRA_USERNAME;
let password = process.env.JIRA_PASSWORD;

module.exports = function getJiraData(key, callback) {
  cpjax(
    {
      url: `${jiraURL}rest/api/2/search?jql=key="DEV-${key}"&fields=key,summary,status`,
      auth:
        "Basic " +
        new Buffer(username + ":" + password, "utf8").toString("base64")
    },
    function(err, data) {
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
        url: url
      };
      return callback(null, result);
    }
  );
};
