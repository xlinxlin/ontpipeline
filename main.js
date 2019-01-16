// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
let exec = require("child_process").exec;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

//listen to an open-file-dialog command and sending back selected information
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('get-threads-number', function(event){
  exec('cat /proc/cpuinfo | grep processor | wc -l', function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
    event.sender.send('return-threads-number',stdout);
  });
})

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-file', files)
  })
})

ipc.on('nb-open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('nb-selected-file', files)
  })
})

ipc.on('selectstatfile', function (event) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('selected-stat-file', files)
  })
})

ipc.on('checkjobstatus', function (event) {
  exec('qstat', function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
    event.sender.send('jobstatus',stdout===''?'No jobs.':stdout);
  });
})

//ipc.on('submitForm', function(event, data) {
   // Access form data here
//});

let path = require('path')
function createWindow (event) {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, 
    height: 600,
    icon: path.join(__dirname, 'icon/icon.png')
  })
  

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

/*
app.on('ready', function(event){
  exec('cat /proc/cpuinfo | grep processor | wc -l', function (err, stdout, stderr) {
    if (err) handleError();
    console.log(stdout);
    console.log(stderr);
    event.sender.send('getthreads',stdout);
  });
})
*/

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
