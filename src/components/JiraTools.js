const crelns = require("crelns");
const svg = crelns.bind(null, "http://www.w3.org/2000/svg");

module.exports = function jiraComponent(fastn, app) {
  var status = fastn(
    "div",
    {
      hidden: fastn.binding("componentData.status", status => !status),
      class: fastn.binding("componentData.status", status => {
        return [
          "jira-status",
          status &&
            "status-" +
              status
                .trim()
                .toLowerCase()
                .replace(/ /g, "-")
        ];
      })
    },
    fastn.binding("componentData.status")
  ).attach(app.state);

  var keyText = fastn(
    "div",
    {
      class: "jira-issue-key-text"
    },
    fastn.binding("componentData.key")
  );
  var connector = svg(
    "svg",
    {
      class: "connector",
      width: "100%",
      height: "1px"
    },
    svg("path", {
      class: "connector-line",
      d: "M0,1 h1000"
    })
  );
  var connectorTemplate = fastn("templater", {
    data: fastn.binding("componentData"),
    template: function(model) {
      var status = model.get("item.status");
      if (status) {
        return connector;
      }
    }
  });
  var copyStatus = fastn(
    "div",
    {
      hidden: fastn.binding("componentData.status", status => !status),
      class: "copy-status"
    },
    "Copied to clipboard!"
  );
  var issueKey = fastn(
    "div",
    {
      hidden: fastn.binding("componentData.status", status => !status),
      class: "jira-issue-key"
    },
    keyText,
    connectorTemplate,
    copyStatus
  ).attach(app.state);

  var issueSummary = fastn(
    "div",
    {
      class: "jira-issue-summary"
    },
    fastn.binding("componentData.summary")
  );
  var details = fastn(
    "div",
    {
      class: "jira-details"
    },
    issueKey,
    issueSummary
  ).attach(app.state);

  var openIssue = fastn(
    "a",
    {
      class: "jira-open-issue-icon",
      href: fastn.binding("componentData.url"),
      target: "_blank"
    },
    fastn.binding("componentData.url", url => (url ? "→" : null))
  ).attach(app.state);

  var openIssueContainer = fastn(
    "div",
    { class: "jira-open-issue" },
    openIssue
  );

  return fastn(
    "div",
    {
      class: "jira-component-container"
    },
    status,
    details,
    openIssueContainer
  );
};
