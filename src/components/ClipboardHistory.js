module.exports = function clipboardHistoryComponent(fastn, app) {
  var clipboardHistoryList = fastn("list", {
    class: "clipboard-history-list",
    items: app.state.mockClipboard,
    template: function() {
      return fastn(
        "div",
        {
          class: fastn.binding("item", app.selectedClipboardHistoryItemBinding, function(item, selectedItem) {
            return ["history-item", item === selectedItem ? "selected" : "not-selected"];
          })
        },
        fastn.binding("item")
      );
    }
  });

  return fastn(
    "div",
    {
      class: "clipboard-history-component-container"
    },
    clipboardHistoryList
  ).attach(app.state);
};
