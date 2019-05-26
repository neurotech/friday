module.exports = function jiraComponent(fastn, app) {
  var status = fastn(
    "div",
    { class: "jira-status" },
    fastn
      .binding("componentData.key", key =>
        key ? key : "Please enter an issue key above and hit Enter."
      )
      .attach(app.state)
  );

  var openIssue = fastn(
    "a",
    {
      class: "jira-open-issue",
      href: fastn.binding("componentData.url"),
      target: "_blank"
    },
    fastn.binding("componentData.url", url =>
      url ? "Open issue in browser →" : "No issue data."
    )
  ).attach(app.state);

  return fastn("div", { class: "jira-component-container" }, status, openIssue);
};
