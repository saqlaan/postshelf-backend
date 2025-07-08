const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

function extractJsonFromCodeBlock(text) {
  return text
    .replace(/```json|```/g, "")  // remove markdown code fences
    .trim();                      // remove whitespace
}


app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/api/extract", async (req, res) => {
  const { letterContent } = req.body;

  const prompt = `
You are an information extraction assistant. From the following letter content, extract:

1. The organization name (if mentioned).
2. The headline or subject of the letter (a brief summary or the main topic).

Return the result in the stringified JSON format:
{
  "organization_name": "<extracted organization name or null>",
  "headline": "<extracted headline or subject>"
}

Letter content:
"""
${letterContent}
"""`;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // const output = response.data.choices[0].message.content;
    // console.log(output);
    // res.json(JSON.parse(output));
    const data = response.data;
    const message = data.choices[0].message.content;
    const jsonStr = extractJsonFromCodeBlock(message);
    const parsed = JSON.parse(jsonStr);
    if (parsed) {
      res.json(parsed);
    } else {
      res.json({ error: "No message received" });
    }
  } catch (err) {
    console.log(err);
    console.error("OpenAI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to extract data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

