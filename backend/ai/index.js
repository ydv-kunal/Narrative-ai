// AI selector (MOST IMPORTANT FILE)

const { generateWithGemini } = require("./gemini");
const { generateWithGroq } = require("./groq");

async function generateStory(engine, prompt) {
  if (engine === "groq") {
    return await generateWithGroq(prompt);
  }

  // default → gemini
  return await generateWithGemini(prompt);
}

module.exports = { generateStory };
