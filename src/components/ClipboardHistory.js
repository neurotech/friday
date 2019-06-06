module.exports = function clipboardHistoryComponent(fastn, app) {
  var clipboardHistoryList = fastn("list", {
    class: "clipboard-history-list",
    items: fastn.binding("clipboardHistory"),
    template: function() {
      return fastn(
        "div",
        {
          class: fastn.binding("item", app.selectedClipboardHistoryItemBinding, function(item, selectedItem) {
            return ["clipboard-history-item", item === selectedItem ? "selected" : "not-selected"];
          })
        },
        fastn.binding("item.fullText", item => {
          return item;
        })
      );
    }
  });

  var clipboardHistoryFulltext = fastn(
    "pre",
    { class: "clipboard-history-fulltext" },
    fastn.binding("selectedClipboardHistoryItem.fullText", item => {
      if (item) {
        var maxLength = 750;
        return item.length >= maxLength - 3 ? item.substring(0, maxLength) + "..." : item;
      }
    })
  ).attach(app.state);

  var clipboardHistoryEpoch = fastn(
    "div",
    { class: "clipboard-history-epoch" },
    fastn.binding("selectedClipboardHistoryItem.epoch", epoch => {
      var d = new Date(epoch);
      var utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
      var nd = new Date(utc + 3600000 * 10);
      return "Copied on " + nd.toLocaleString();
    })
  );

  var clipboardHistoryItem = fastn(
    "div",
    { class: "clipboard-history-detail" },
    clipboardHistoryFulltext,
    clipboardHistoryEpoch
  );

  return fastn(
    "div",
    {
      class: "clipboard-history-component-container"
    },
    clipboardHistoryList,
    clipboardHistoryItem
  ).attach(app.state);
};
