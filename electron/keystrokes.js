const { uIOhook, UiohookKey } = require('uiohook-napi');
const { getHand, getDirection } = require('./handmap');
const { addEvent } = require('./sender');

const MODIFIER_KEYS = new Set([
  UiohookKey.Shift, UiohookKey.ShiftRight,
  UiohookKey.Ctrl, UiohookKey.CtrlRight,
  UiohookKey.Alt, UiohookKey.AltRight,
  UiohookKey.Meta, UiohookKey.MetaRight,
]);

// keycode -> { keyDownTime, flightTime, latencyTime, hand, direction }
const pending = new Map();

let prevKeyDownTime = null;
let prevKeyUpTime = null;
let prevHand = null;

uIOhook.on('keydown', (event) => {
  if (MODIFIER_KEYS.has(event.keycode)) return;

  const hand = getHand(event.keycode);
  if (hand === null) return;

  const flightTime = prevKeyUpTime !== null ? event.time - prevKeyUpTime : null;
  const latencyTime = prevKeyDownTime !== null ? event.time - prevKeyDownTime : null;
  const direction = getDirection(prevHand, hand);

  pending.set(event.keycode, { keyDownTime: event.time, flightTime, latencyTime, hand, direction });

  prevKeyDownTime = event.time;
  prevHand = hand;
});

uIOhook.on('keyup', (event) => {
  if (MODIFIER_KEYS.has(event.keycode)) return;

  const p = pending.get(event.keycode);
  if (!p) return;
  pending.delete(event.keycode);

  prevKeyUpTime = event.time;

  // Skip first keystroke — no previous key to compute flight/latency from
  if (p.flightTime === null || p.latencyTime === null || p.direction === null) return;

  addEvent({
    hand: p.hand,
    direction: p.direction,
    hold_time: event.time - p.keyDownTime,
    flight_time: p.flightTime,
    latency_time: p.latencyTime,
  });
});

function startCapture() {
  uIOhook.start();
}

function stopCapture() {
  uIOhook.stop();
}

module.exports = { startCapture, stopCapture };
