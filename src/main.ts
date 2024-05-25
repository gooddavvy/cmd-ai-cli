import { app, BrowserWindow } from "electron";
import * as path from "path";
import electronReload from "electron-reload";

// Auto-reload the application on changes
electronReload(path.join(__dirname, ".."), {
    electron: require(`${__dirname}/../node_modules/electron`)
});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
