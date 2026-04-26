# cadence

More than 10 million people live with Parkinson's worldwide. It's the world's fastest-growing neurodegenerative disease and early detection significantly improves treatment options. Clinical tests are short term, but what if there was a solution that monitors behavior over a period of time? In our digital age, many are constantly typing away on their keyboard, and we wanted to use this data to predict early stages of Parkinson's. 
## What it does
Cadence monitors your keystroke patterns in the background and uses machine learning to detect early stages of Parkinson's. This is particularly useful for the elderly who are at a higher risk of Parkinson's.

## How we built it
We used Figma make and converted it to Typescript for the frontend and FastAPI for the backend. We also leveraged Electron as the desktop wrapper.

## Accomplishments that we're proud of
We created a model with a 74% accuracy and implemented this in a user-friendly application to target a pressing medical problem.
=======
# Cadence

More than 10 million people live with Parkinson's worldwide. It's the world's fastest-growing neurodegenerative disease and early detection significantly improves treatment options. Clinical tests are short term, but what if there was a solution that monitors behavior over a period of time? In our digital age, many are constantly typing away on their keyboard, and we wanted to use this data to predict early stages of Parkinson's.

## What it does

Cadence monitors your keystroke patterns in the background and uses machine learning to detect early stages of Parkinson's. This is particularly useful for the elderly who are at a higher risk of Parkinson's.

## How we built it

We used Figma and converted it to TypeScript for the frontend and FastAPI for the backend. We also leveraged Electron as the desktop wrapper.

## Accomplishments that we're proud of

We created a model with a 74% accuracy and implemented this in a user-friendly application to target a pressing medical problem.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (3.10+)
- On Windows: run the app as Administrator (required for system-wide keystroke capture)
- On macOS: grant Accessibility permissions when prompted on first launch

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/libozaza/cadence.git
cd cadence
```

### 2. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Frontend

```bash
cd frontend
npm install
npm run build
```

### 4. Electron

```bash
cd electron
npm install
npm run rebuild   # rebuilds uiohook-napi for your Electron version
```

## Running the app

```bash
cd electron
npm start
```

This launches the backend automatically and opens the dashboard.

## Demo seeding (optional)

To populate the app with realistic demo data instead of waiting for real typing history:

```bash
cd backend

# Healthy profile (low risk)
python seed_healthy.py

# High-risk profile (elevated motor deviation)
python seed_highrisk.py
```

Then click **Refresh** in the app to load the seeded data.

## Project structure

```
cadence/
├── electron/       # Desktop shell — keystroke capture, backend process management
├── backend/        # FastAPI server — ingestion, aggregation, ML inference
└── frontend/       # React dashboard — charts, risk score, settings
```
>>>>>>> Stashed changes
