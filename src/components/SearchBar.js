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
      var spaceKey = 32;
      var escKey = 27;
      var backspaceKey = 8;
      var deleteKey = 46;
      var tabKey = 9;
      var enterKey = 13;
      var upArrowKey = 38;
      var downArrowKey = 40;
      var lKey = 76;

      if (event.ctrlKey && event.which == spaceKey) {
        window.minimize();
      }

      if (event.ctrlKey && event.which == lKey) {
        var filter = app.getFilterValue();
        if (filter) {
          app.renderLargeText(filter);
        }
      }

      if (event.which === escKey) {
        var filter = app.getFilterValue();
        if (!filter) {
          var currentWindow = require("electron").remote.getCurrentWindow();
          currentWindow.minimize();
        } else {
          app.clearComponentData();
          app.clearActiveCommand();
          app.clearFilter();
        }
        event.preventDefault();
      }

      if (event.which === tabKey) {
        event.target.focus();
        app.expandCommand();
        moveCursorToEnd(event.target);
        event.preventDefault();
      }

      if (event.which === enterKey) {
        app.executeCommand();
        moveCursorToEnd(event.target);
        event.preventDefault();
      }

      var activeCommand = app.getActiveCommand();

      if (activeCommand && activeCommand.isNavigable) {
        var componentData = app.getComponentData();
        var index = Math.max(componentData.indexOf(app.selectedClipboardHistoryItemBinding()), 0);

        if (event.which === upArrowKey) {
          index--;
          moveCursorToEnd(event.target);
          event.preventDefault();
        } else if (event.which === downArrowKey) {
          index++;
          moveCursorToEnd(event.target);
          event.preventDefault();
        }

        if (componentData.length === 0) {
          index = 0;
        } else {
          index = index % componentData.length;
        }
        if (index < 0) {
          index = componentData.length - 1;
        }

        app.selectedClipboardHistoryItemBinding(componentData[index]);
      } else {
        /* Initial up/down arrow logic START */
        var filteredCommands = app.filteredCommandsBinding();
        var index = Math.max(filteredCommands.indexOf(app.selectedCommandBinding()), 0);

        if (event.which === upArrowKey) {
          index--;
          moveCursorToEnd(event.target);
          event.preventDefault();
        } else if (event.which === downArrowKey) {
          index++;
          moveCursorToEnd(event.target);
          event.preventDefault();
        }

        if (filteredCommands.length === 0) {
          index = 0;
        } else {
          index = index % filteredCommands.length;
        }
        if (index < 0) {
          index = filteredCommands.length - 1;
        }

        app.selectedCommandBinding(filteredCommands[index]);
        /* Initial up/down arrow logic END */
      }

      if (event.which === backspaceKey || event.which === deleteKey) {
        var activeCommand = app.getActiveCommand();
        if (activeCommand) {
          if (
            !event.target.value.startsWith(activeCommand.commandName) ||
            event.target.value.trim() === activeCommand.commandName
          ) {
            app.clearComponentData();
            app.clearActiveCommand();
          }
        }
      }
    });
};
