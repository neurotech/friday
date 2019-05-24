const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const tray = require("./tray");

let friday = null;
let trayIcon = null;
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

  trayIcon = tray.create(app, friday);

  friday.loadURL(path.join(__dirname, "build/index.html"));

  friday.on("hide", () => {
    isActive = false;
  });

  friday.on("show", () => {
    isActive = true;
  });

  globalShortcut.register("Control+Space", () => {
    if (isActive) {
      friday.hide();
    } else {
      friday.show();
    }
  });

  friday.once("ready-to-show", () => {
    friday.show();
  });
});
