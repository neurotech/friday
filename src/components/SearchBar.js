// Thanks to https://gist.github.com/darryl-snow/3990793
function moveCursorToEnd(element) {
  if (typeof element.selectionStart == "number") {
    element.selectionStart = element.selectionEnd = element.value.length;
  } else if (typeof element.createTextRange != "undefined") {
    element.focus();
    var range = element.createTextRange();
    range.collapse(false);
    range.select();
  }
}

module.exports = function createSearchBar(fastn, app) {
  return fastn("input", {
    class: "search",
    autofocus: true,
    value: fastn.binding("filter"),
    oninput: "value:value",
    type: "text"
  })
    .attach(app.state)
    .on("submit", event => {
      event.preventDefault();
    })
    .on("blur", () => {
      document.querySelector(".search").focus();
    })
    .on("keydown", event => {
      var tabKey = 9;
      var enterKey = 13;
      var upArrowKey = 38;
      var downArrowKey = 40;
      if (event.which == tabKey || event.keyCode == tabKey) {
        var searchBarElement = document.querySelector(".search");
        searchBarElement.focus();
        app.expandCommand();
        moveCursorToEnd(searchBarElement);
        event.preventDefault();
      }

      if (event.which == enterKey || event.keyCode == enterKey) {
        app.executeCommand();
        event.preventDefault();
      }

      var selectedCommandBinding = fastn
        .binding("selectedCommand")
        .attach(app.state);

      var filteredCommands = fastn
        .binding("commands|*", "filter", (commands, filter) =>
          commands.filter(command =>
            command.commandName.match(new RegExp(filter, "i"))
          )
        )
        .on("change", filteredCommands => {
          if (
            filteredCommands &&
            !~filteredCommands.indexOf(selectedCommandBinding())
          ) {
            selectedCommandBinding(filteredCommands[0]);
          }
        })
        .attach(app.state);
      var nope = filteredCommands();
      var index = Math.max(nope.indexOf(app.state.selectedCommand), 0);

      if (event.which === upArrowKey) {
        index--;
      } else if (event.which === downArrowKey) {
        index++;
      }

      index = index % filteredCommands.length;
      if (index < 0) {
        index = filteredCommands.length - 1;
      }

      fastn.Model.set(app.state, "selectedCommand", filteredCommands[index]);
    });
};
