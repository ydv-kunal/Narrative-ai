const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Google Gemini RUNNING")

async function generateWithGemini(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

//   const result = await model.generateContent(prompt);
//   return result.response.text();
    
     
    let aiResult;
    try {
        aiResult = await model.generateContent(prompt);
    } catch (err) {
        console.error("Gemini failed:", err);

        // Commented out return res.status because 'res' is not defined inside this utility function.
        // It causes ReferenceError. We throw the error so the caller (index.js) can return the correct response status.
        throw err;
        /*
        return res.status(503).json({
            error: "AI_TEMP_UNAVAILABLE"
        });
        */
    }

    const text = aiResult.response.text();
    return text;
}

module.exports = { generateWithGemini };
