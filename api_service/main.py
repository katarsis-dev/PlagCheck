from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModel
import torch


"""
input text
"""
tokenizer = AutoTokenizer.from_pretrained("indobenchmark/indobert-lite-base-p1")
model = AutoModel.from_pretrained("indobenchmark/indobert-lite-base-p1")
model.eval()
input_text = "test"


app = FastAPI()


@app.post("/compare")
def get_embedding(text: str):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    cls_embedding = outputs.last_hidden_state[:,0,:]
    embedding_list = cls_embedding[0].tolist() 
    
    return {"embedding" : embedding_list};
