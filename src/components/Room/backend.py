from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

# อนุญาตให้ React frontend call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # หรือใส่ URL ของ frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LINE_TOKEN = "2tsmXa/NOpJYsgZrZ0tOtYZcB2MORAGJxtR/oMTmqCgcqsFF/6+JzmFPeLFjJDspwPjr28Tew3UXkDSFACswa+YS/wc0cIRQc6UOqCDIcp7dz1ZgvwkGLz2Se7FUPF84d/nl9YdXvh5Ua0uhwwXH+AdB04t89/1O/w1cDnyilFU="  # ใส่ Token ของคุณ

@app.post("/send-line")
async def send_line(request: Request):
    try:
        data = await request.json()
        message = data.get("message", "")

        url = "https://api.line.me/v2/bot/message/broadcast"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {LINE_TOKEN}"
        }
        payload = {
            "messages": [{"type": "text", "text": message}]
        }

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        return {"status": "success", "data": response.json()}
    except Exception as e:
        return {"status": "error", "message": str(e)}
