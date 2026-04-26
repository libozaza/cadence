from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import ingest, predict, history, calibration, admin
from services.storage import init_db
from services.inference import load_model
from services.calibration import load_calibration_data
from jobs.daily_aggregation import schedule_daily_job


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    load_model()
    load_calibration_data()
    scheduler = schedule_daily_job()
    yield
    scheduler.shutdown()


app = FastAPI(title="Cadence", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router)
app.include_router(predict.router)
app.include_router(history.router)
app.include_router(calibration.router)
app.include_router(admin.router)


@app.get("/health")
def health():
    return {"status": "ok"}
