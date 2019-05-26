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
        event.target.focus();
        app.expandCommand();
        moveCursorToEnd(event.target);
        event.preventDefault();
      }

      if (event.which == enterKey || event.keyCode == enterKey) {
        app.executeCommand();
        event.preventDefault();
      }

      var filteredCommands = app.filteredCommandsBinding();
      var index = Math.max(filteredCommands.indexOf(app.selectedCommandBinding()), 0);

      console.log('before', index);

      if (event.which === upArrowKey) {
        index--;
      } else if (event.which === downArrowKey) {
        index++;
      }

      index = index % filteredCommands.length;
      if (index < 0) {
        index = filteredCommands.length - 1;
      }

      console.log('after', index);

      app.selectedCommandBinding(filteredCommands[index]);
    });
};
