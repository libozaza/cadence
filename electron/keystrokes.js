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

  const flightTime = prevKeyUpTime !== null ? event.time - prevKeyUpTime : null;
  const latencyTime = prevKeyDownTime !== null ? event.time - prevKeyDownTime : null;

  pending.set(event.keycode, { keyDownTime: event.time, flightTime, latencyTime });

  prevKeyDownTime = event.time;
});

uIOhook.on('keyup', (event) => {
  if (MODIFIER_KEYS.has(event.keycode)) return;

  const p = pending.get(event.keycode);
  if (!p) return;
  pending.delete(event.keycode);

  prevKeyUpTime = event.time;

  if (p.flightTime === null || p.latencyTime === null) return;

  const evt = {
    timestamp: new Date().toISOString(),
    hold_time: event.time - p.keyDownTime,
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
