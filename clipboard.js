const clipboard = require("electron").clipboard;
const Store = require("electron-store");

function checkClipboard(historyStore, callback) {
  var currentContents = clipboard.readText("clipboard");
  var allItems = historyStore.get("items");

  var allItemsDescending = [...allItems];
  allItemsDescending.sort(function compare(a, b) {
    var dateA = a.epoch;
    var dateB = b.epoch;
    return dateB - dateA;
  });

  var latestHistoryItem = allItemsDescending[0];

  if (!latestHistoryItem || currentContents !== latestHistoryItem.fullText) {
    if (allItemsDescending.length > 12) {
      var pruned = [...allItemsDescending];
      historyStore.set("items", pruned.slice(0, 12));
      callback(historyStore.get("items"));
    }
    var freshy = historyStore.get("items");
    historyStore.set("items", freshy.concat([{ fullText: currentContents, epoch: Date.now() }]));
    callback(historyStore.get("items"));
  }
}

module.exports = {
  watch: function watchClipboard(callback) {
    var historyStore = new Store({ name: "clipboard", defaults: { items: [] } });
    callback(historyStore.get("items"));

    setInterval(() => {
      checkClipboard(historyStore, items => {
        callback(items);
      });
    }, 1000);
  }
};
