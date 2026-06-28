from fastapi import FastAPI, UploadFile
from transformers import AutoTokenizer, AutoModel
from pydantic import BaseModel
from torch.nn.functional import cosine_similarity
import torch.nn.functional as F
import torch
import fitz


"""
input text
"""
tokenizer = AutoTokenizer.from_pretrained("indobenchmark/indobert-lite-base-p1")
model = AutoModel.from_pretrained("indobenchmark/indobert-lite-base-p1")
model.eval()


app = FastAPI()

class checkRequest(BaseModel):
    text1 : str
    text2 : str
    
def extract_embedding(text:str):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    embedding = outputs.last_hidden_state.mean(dim=1)
    embedding = F.normalize(embedding,p=2)
    return embedding

def extract_text_from_pdf(file : UploadFile):
    content = file.read()
    doc = fitz.open(stream=content, mode=None)
    
@app.post("/compare/text")
def compare_text(request : checkRequest):
    embed1 = extract_embedding(request.text1)
    embed2 = extract_embedding(request.text2)
    score = cosine_similarity(embed1,embed2).item()
    return {"Similarity Score" : score}

