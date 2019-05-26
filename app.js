const { app, BrowserWindow, globalShortcut, Tray, Menu } = require("electron");
const path = require("path");

let friday = null;
let tray = null;
let isActive = true;

app.on("ready", () => {
  friday = new BrowserWindow({
    width: 640,
    height: 512,
    show: true,
    frame: false,
    resizable: false,
    transparent: true
  });

  tray = new Tray(path.join(__dirname, "./icons/tray.ico"));
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

  friday.on("hide", () => {
    isActive = false;
  });

  friday.on("show", () => {
    isActive = true;
  });

  friday.webContents.on("new-window", function(e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  globalShortcut.register("Control+Space", () => {
    if (isActive) {
      friday.hide();
    } else {
      friday.show();
    }
  });

  friday.loadURL(path.join(__dirname, "build/index.html"));

  friday.once("ready-to-show", () => {
    friday.show();
  });
});
