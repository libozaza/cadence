const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const { startCapture, stopCapture } = require('./keystrokes');
const { flush, startFlushTimer } = require('./sender');

let apiProcess = null;

function spawnBackend() {
  const backendDir = path.join(__dirname, '..', 'backend');
  const isWin = process.platform === 'win32';
  const venvPython = isWin
    ? path.join(backendDir, 'venv', 'Scripts', 'python.exe')
    : path.join(backendDir, 'venv', 'bin', 'python');
  apiProcess = spawn(venvPython, ['-m', 'uvicorn', 'main:app', '--port', '8000'], {
    cwd: backendDir,
    stdio: 'inherit',
  });
}

async function waitForApi(retries = 20, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch('http://127.0.0.1:8000/health');
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, delayMs));
  }
  console.error('Backend did not become ready in time');
}

app.whenReady().then(async () => {
  spawnBackend();
  await waitForApi();

  startFlushTimer();
  startCapture();

  const win = new BrowserWindow({ width: 1200, height: 800 });
  win.loadURL('http://localhost:3000');
});

app.on('before-quit', async (event) => {
  event.preventDefault();
  stopCapture();
  await flush();
  if (apiProcess) {
    apiProcess.kill();
    apiProcess = null;
  }
  app.exit(0);
});
