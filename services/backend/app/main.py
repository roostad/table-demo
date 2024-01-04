import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.accounts import accounts


log = logging.getLogger("uvicorn")


def create_application():
    application = FastAPI()

    application.include_router(accounts)

    origins = [
        "http://localhost:5173"
    ]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    log.info("Starting up...")


@app.on_event("shutdown")
async def shutdown_event():
    log.info("Starting up...")


@app.get("/health/")
def health():
    return {"message": "OK"}
