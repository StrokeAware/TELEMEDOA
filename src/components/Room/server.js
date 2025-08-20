const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ใส่ LINE Channel Access Token ของคุณ
const LINE_TOKEN = "2tsmXa/NOpJYsgZrZ0tOtYZcB2MORAGJxtR/oMTmqCgcqsFF/6+JzmFPeLFjJDspwPjr28Tew3UXkDSFACswa+YS/wc0cIRQc6UOqCDIcp7dz1ZgvwkGLz2Se7FUPF84d/nl9YdXvh5Ua0uhwwXH+AdB04t89/1O/w1cDnyilFU=";

app.post("/send-line", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.line.me/v2/bot/message/broadcast",
      {
        messages: [{ type: "text", text: message }]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_TOKEN}`
        }
      }
    );

    res.json({ status: "success", data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ status: "error", message: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
