const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

let win;
const IMAGE_EXTENSIONS = ['.jpg', '.png'];

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });

  const filePath = path.join(__dirname, `/../../dist/ImageBrowser/index.html`);
  win.loadFile(filePath);
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

async function getImages() {
  const applicationFolderPath = process.cwd();

  const files = await fs.promises.readdir(applicationFolderPath, {withFileTypes: true})
  const imagePaths = files
    // filter out folders.
    .filter(_ => _.isFile())
    // filter out non image files.
    .filter(_ => {
      const fileExtension = path.extname(_.name)
      return IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase());
    })
    // convert to path.
    .map(_ => {
      return `file://${applicationFolderPath}/${_.name}`;
    });

  win?.webContents.send('getImagesResponse', imagePaths);
}

function isRoot() {
  return path.parse(process.cwd()).root === process.cwd();
}

async function getDirectory() {
  const files = await fs.promises.readdir('.', {withFileTypes: true})
  const directories = files
    .filter(file => file.isDirectory())
    .map(file => file.name);

  if (!isRoot()) {
    directories.unshift('..');
  }

  win?.webContents.send('getDirectoryResponse', directories);
}

ipcMain.on('navigateDirectory', (event, directoryPath) => {
  process.chdir(directoryPath);
  getImages();
  getDirectory();
});
