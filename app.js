const { app, BrowserWindow, globalShortcut, Tray, Menu, shell } = require("electron");
const config = require("./config");
const clipboard = require("./clipboard");
const path = require("path");

let friday = null;
let tray = null;
let isActive = true;

var configValid = config.initialise();

app.on("ready", () => {
  friday = new BrowserWindow({
    width: 720,
    height: 540,
    backgroundColor: null,
    show: true,
    frame: false,
    resizable: false,
    transparent: true,
    center: true,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  tray = new Tray(path.join(__dirname, "./icons/tray.ico"));
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Friday",
      click: function () {
        friday.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  friday.on("hide", () => {
    isActive = false;
    friday.webContents.send("clear-state");
  });

  friday.on("show", () => {
    isActive = true;
  });

  friday.on("blur", () => {
    isActive = false;
    if (process.env.NODE_ENV !== "development") {
      friday.hide();
    }
  });

  friday.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  globalShortcut.register("Control+Space", () => {
    if (isActive) {
      friday.hide();
    } else {
      friday.show();
    }
  });

  friday.loadURL(path.join(__dirname, "src/index.html"));

  friday.webContents.once("dom-ready", () => {
    friday.webContents.send("config-validation", configValid);
  });

  friday.webContents.on("did-finish-load", () => {
    clipboard.watch((items) => {
      if (items) {
        friday.webContents.send("clipboard-update", items);
      }
    });
  });

  friday.once("ready-to-show", () => {
    friday.show();
  });
});
