from fastapi import FastAPI, Request, Depends
from typing import Annotated
from pydantic import BaseModel
from contextlib import asynccontextmanager
from models.loaders import load_models 
from sentence_transformers import SentenceTransformer

@asynccontextmanager
async def lifespan(app:FastAPI):
    models = load_models()
    app.state.model = models
    yield


app = FastAPI(lifespan=lifespan)

class Text(BaseModel):
    text1 : str
    text2 : str

async def dependency_model(request : Request):
    return request.app.state.model


@app.post("/compare/text")
async def compareText(item : Text,model : Annotated[SentenceTransformer,Depends(dependency_model)]):
    embeddings = model.encode([item.text1,item.text2] , normalize_embeddings=True)
    score_similarity = model.similarity(embeddings[0],embeddings[1])
   
    return {"message" : "Send things Berhasil","score" : score_similarity.item()}