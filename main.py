from fastapi import FastAPI, UploadFile
from transformers import AutoTokenizer, AutoModel
from pydantic import BaseModel
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
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
        
    return outputs.last_hidden_state[:,0,:]

def extract_text_from_pdf(file : UploadFile):
    content = file.read()
    doc = fitz.open(stream=content, mode=None)
    
@app.post("/compare/text")
def get_embedding(request : checkRequest):
    embed1 = extract_embedding(request.text1)
    embed2 = extract_embedding(request.text2)
        
    return {"embedding" : embedding_list};

