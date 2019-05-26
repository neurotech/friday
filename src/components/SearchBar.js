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

      if (event.which == upArrowKey || event.keyCode == upArrowKey) {
        app.setSelectedItem("prev");
        event.preventDefault();
      }

      if (event.which == downArrowKey || event.keyCode == downArrowKey) {
        app.setSelectedItem("next");
        event.preventDefault();
      }
    });
};
