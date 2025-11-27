
// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// // 处理开发环境和生产环境的 URL
// const isDev = !app.isPackaged;

// function createWindow() {
//   // 创建浏览器窗口
//   const mainWindow = new BrowserWindow({
//     width: 390, // 模拟手机宽度
//     height: 844, // 模拟手机高度
//     resizable: true, // 允许调整大小
//     webPreferences: {
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//     title: "本溪市高级中学校友汇",
//     titleBarStyle: 'hiddenInset' // Mac风格的标题栏
//   });

//   // 加载应用
//   if (isDev) {
//     // 开发模式：加载 Vite 本地服务
//     // 注意：这里假设 Vite 运行在 5173 端口，如果不是请修改
//     mainWindow.loadURL('http://localhost:5173');
//     // 开发模式下打开控制台
//     // mainWindow.webContents.openDevTools();
//   } else {
//     // 生产模式：加载打包后的文件
//     mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
//   }
// }

// // 当 Electron 完成初始化并准备好创建浏览器窗口时调用
// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// // 除了 macOS 外，当所有窗口关闭时退出应用
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });
