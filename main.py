from fastapi import FastAPI, Request, Depends
from pydantic import BaseModel
from contextlib import asynccontextmanager
from models.loaders import load_models 

@asynccontextmanager
async def lifespan(app:FastAPI):
    models = load_models()
    app.state.model = models
    yield


app = FastAPI(lifespan=lifespan)

class Text(BaseModel):
    text1 : str
    text2 : str


@app.post("/compare/text")
async def compareText(item : Text,request:Request):
    text_dict = item.model_dump()
    
    model = request.app.state.model
    embeddings = model.encode([text_dict["text1"],text_dict["text2"]] , normalize_embeddings=True)
    return {"message" : "Send things Berhasil"
            }