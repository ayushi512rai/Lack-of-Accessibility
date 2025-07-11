from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sign_language_translator.models import get_model
from PIL import Image
import io

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is working!"}

# Load a pre-trained model (e.g., ASL fingerspelling CNN)
model = get_model('asl_fingerspelling_cnn')

@app.post('/api/sign-sequence/')
async def sign_sequence(files: list[UploadFile] = File(...)):
    frames = []
    for file in files:
        image = Image.open(io.BytesIO(await file.read()))
        frames.append(image)
    prediction = model.predict(frames)
    return {"text": prediction} 