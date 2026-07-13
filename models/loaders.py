from sentence_transformers import SentenceTransformer

def load_models():
    load = SentenceTransformer("intfloat/multilingual-e5-base")
    
    return load