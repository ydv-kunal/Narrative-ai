// 1️⃣ Load environment variables
require("dotenv").config();

// 2️⃣ Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { generateStory } = require("./ai");

// 3️⃣ App setup
const app = express();
const PORT = process.env.PORT || 5050;

// 4️⃣ Middleware
app.use(cors());
app.use(express.json());


// 5️⃣ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// 6️⃣ Routes
const storyRoutes = require("./routes/story");
app.use("/api/story", storyRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});




// 7️⃣ Test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 7️⃣ Story generation route
app.post("/api/generate", async (req, res) => {
  console.log("🔥 REQUEST BODY:", req.body);
  try {

    const {
      genre,
      tone,
      length,
      episode = 1,
      previousChoice = "Start",
      previousSummary = "",
      scores = { morality: 0, risk: 0, emotion: 0 },
      engine = req.body.engine,
    } = req.body;

    //console.log("REQ BODY 👉", req.body);


      let totalChapters = 4; // default
      if (length === "Short") totalChapters = 4;
      if (length === "Medium") totalChapters = 5;
      if (length === "Long") totalChapters = 6;

      const prompt = `
      You are an interactive story writer.
Write the next chapter in VERY EASY English for an 11-year-old.
Use short sentences and simple words.

Context:
- Genre: ${genre}
- Tone: ${tone}
- Chapter: ${episode} of ${totalChapters}
- Total Chapters: ${totalChapters}
- Last choice: "${previousChoice}"
- Story so far: "${previousSummary}"
- Scores → Morality: ${scores.morality}, Risk: ${scores.risk}, Emotion: ${scores.emotion}

Rules:
- Write 80-90 words only
- The story must react to the last choice
- Mood should match the scores
- If this is the final chapter, give a clear ending
- No hard or poetic words

Then give EXACTLY 2 choices.
Each choice must include score effects (between -2 and +2).

Return ONLY valid JSON:
Do not add any text outside JSON.

Format:
{
  "storyText": "story here",
  "choices": [
    {
      "text": "choice one",
      "effects": { "morality": _, "risk": _, "emotion": _ }
    },
    {
      "text": "choice two",
      "effects": { "morality": _, "risk": _, "emotion": _ }
    }
  ]
}
`;




    // 8️⃣ Call Gemini
    // const model = genAI.getGenerativeModel({
    //   model: "gemini-2.5-flash",
    // });

    // const aiResult = await model.generateContent(prompt);
    //   let aiResult;
    //   try {
    //       aiResult = await model.generateContent(prompt);
    //   } catch (err) {
    //       console.error("Gemini failed:", err);

    //       return res.status(503).json({
    //           error: "AI_TEMP_UNAVAILABLE"
    //       });
    //   }

    // const text = aiResult.response.text();


    //replacing gemini call with this
      let text;

      try {
          text = await generateStory(engine, prompt);
      } catch (err) {
          return res.status(500).json({
              error: "AI_TEMP_UNAVAILABLE in generateStory",
          });
      }
      console.log("🔥 AI RAW RESPONSE:", text);
      console.log("🔥 TYPE OF RESPONSE:", typeof text);


    const safeText = text.replace(/:\s*\+(\d+)/g, ": $1");


    // 9️⃣ Extract JSON safely
    const jsonStart = safeText.indexOf("{");
    const jsonEnd = safeText.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid AI response format");
    }

    const cleanJson = safeText.slice(jsonStart, jsonEnd);
    const parsed = JSON.parse(cleanJson);

    // if (isFinalChapter) {
    //   res.json({
    //     storyText: parsed.storyText,
    //     choices: [] // story ends
    //   });
    //   return; // ⛔ VERY IMPORTANT
    // }


    // 🔟 Send response to frontend
    res.json(parsed);
  } catch (error) {
    console.error("BACKEND FAILURE:", error);
    return res.status(503).json({
      error: "AI_TEMP_UNAVAILABLE at end",
      //details: error?.message || error
    });
  }
});



// 1️⃣1️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});










// You are an interactive story writer.

//       Write the next chapter of a story in VERY EASY English. As u r writing for a 11 year old kid.
//       Use short sentences and simple words.

//       Story details:
//       - Genre: ${genre}
//       - Tone: ${tone}
//       - Chapter: ${episode}
//       - Last choice: "${previousChoice}"
//       - Story so far: "${previousSummary}"
//       - Player scores:
//       Morality: ${scores.morality}
//       Risk: ${scores.risk}
//       Emotion: ${scores.emotion}

//       Rules:
//       - Write ONLY 90–100 words.
//       - Do NOT use hard or poetic words.
//       - The story must clearly react to the last choice.
//       - The mood should change based on the scores.

//       Then give EXACTLY 2 choices.
//       Each choice must:
//       - Make sense for the story
//       - Affect the scores logically
//       - Use values between -2 and +2

//       Return ONLY valid JSON like this:

//       {
//       "storyText": "story text here",
//       "choices": [
//       {
//         "text": "choice text",
//         "effects": { "morality": 0, "risk": 1, "emotion": -1 }
//       },
//       {
//         "text": "choice text",
//         "effects": { "morality": 1, "risk": -1, "emotion": 1 }
//       }
//       ]}
