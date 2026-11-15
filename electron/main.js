const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({ width: 1000, height: 800 });
  win.loadFile(
    path.join(__dirname, "../dist/pokerandom-angular/browser/index.html"),
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
