const { uIOhook, UiohookKey } = require('uiohook-napi');
const { addEvent } = require('./sender');

const MODIFIER_KEYS = new Set([
  UiohookKey.Shift, UiohookKey.ShiftRight,
  UiohookKey.Ctrl, UiohookKey.CtrlRight,
  UiohookKey.Alt, UiohookKey.AltRight,
  UiohookKey.Meta, UiohookKey.MetaRight,
]);

const pending = new Map();

let prevKeyDownTime = null;
let prevKeyUpTime = null;

uIOhook.on('keydown', (event) => {
  if (MODIFIER_KEYS.has(event.keycode)) return;

  const now = Date.now();
  const flightTime = prevKeyUpTime !== null ? now - prevKeyUpTime : null;
  const latencyTime = prevKeyDownTime !== null ? now - prevKeyDownTime : null;

  pending.set(event.keycode, { keyDownTime: now, flightTime, latencyTime });

  prevKeyDownTime = now;
});

uIOhook.on('keyup', (event) => {
  if (MODIFIER_KEYS.has(event.keycode)) return;

  const now = Date.now();
  const p = pending.get(event.keycode);
  if (!p) return;
  pending.delete(event.keycode);

  prevKeyUpTime = now;

  if (p.flightTime === null || p.latencyTime === null) return;

  const evt = {
    timestamp: new Date().toISOString(),
    hold_time: now - p.keyDownTime,
    flight_time: p.flightTime,
    latency_time: p.latencyTime,
  };
  console.log('[keystroke]', evt);
  addEvent(evt);
});

function startCapture() {
  uIOhook.start();
}

function stopCapture() {
  uIOhook.stop();
}

module.exports = { startCapture, stopCapture };
