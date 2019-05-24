const { Tray, Menu } = require("electron");
const path = require("path");

module.exports = {
  create: function createTray(app, friday) {
    var tray = new Tray(path.join(__dirname, "./icons/tray.ico"));
    var contextMenu = Menu.buildFromTemplate([
      {
        label: "Show Friday",
        click: function() {
          friday.show();
        }
      },
      {
        label: "Quit",
        click: function() {
          app.quit();
        }
      }
    ]);
    tray.setContextMenu(contextMenu);

    return tray;
  }
};
