const { UiohookKey } = require('uiohook-napi');

const LEFT_KEYS = new Set([
  UiohookKey.KeyQ, UiohookKey.KeyW, UiohookKey.KeyE, UiohookKey.KeyR, UiohookKey.KeyT,
  UiohookKey.KeyA, UiohookKey.KeyS, UiohookKey.KeyD, UiohookKey.KeyF, UiohookKey.KeyG,
  UiohookKey.KeyZ, UiohookKey.KeyX, UiohookKey.KeyC, UiohookKey.KeyV, UiohookKey.KeyB,
]);

const RIGHT_KEYS = new Set([
  UiohookKey.KeyY, UiohookKey.KeyU, UiohookKey.KeyI, UiohookKey.KeyO, UiohookKey.KeyP,
  UiohookKey.KeyH, UiohookKey.KeyJ, UiohookKey.KeyK, UiohookKey.KeyL,
  UiohookKey.KeyN, UiohookKey.KeyM,
  UiohookKey.Semicolon, UiohookKey.Quote,
  UiohookKey.BracketLeft, UiohookKey.BracketRight,
  UiohookKey.Backslash, UiohookKey.Comma,
  UiohookKey.Period, UiohookKey.Slash,
]);

function getHand(keycode) {
  if (keycode === UiohookKey.Space) return 'S';
  if (LEFT_KEYS.has(keycode)) return 'L';
  if (RIGHT_KEYS.has(keycode)) return 'R';
  return null;
}

function getDirection(prevHand, currentHand) {
  if (prevHand === null || currentHand === null) return null;
  if (prevHand === 'S' || currentHand === 'S') return 'S';
  return prevHand + currentHand;
}

module.exports = { getHand, getDirection };
