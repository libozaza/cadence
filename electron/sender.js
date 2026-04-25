const BATCH_SIZE = 50;
const FLUSH_INTERVAL_MS = 30000;

// TODO: Replace with real user identity system before distributing to participants
const USER_KEY = 'TESTUSER01';

let buffer = [];
let flushTimer = null;

function addEvent(event) {
  buffer.push(event);
  if (buffer.length >= BATCH_SIZE) {
    sendBatch();
  }
}

async function sendBatch() {
  if (buffer.length === 0) return;

  const events = buffer.splice(0, buffer.length);

  try {
    const response = await fetch('http://localhost:8000/keystrokes/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_key: USER_KEY, events }),
    });

    if (!response.ok) {
      buffer = [...events, ...buffer];
    }
  } catch {
    buffer = [...events, ...buffer];
  }
}

async function flush() {
  clearInterval(flushTimer);
  flushTimer = null;
  await sendBatch();
}

function startFlushTimer() {
  flushTimer = setInterval(sendBatch, FLUSH_INTERVAL_MS);
}

module.exports = { addEvent, flush, startFlushTimer };
