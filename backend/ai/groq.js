const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateWithGroq(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null
  });

  console.log("GROQ API RUNNING")
  return completion.choices[0].message.content;
}

module.exports = { generateWithGroq };
// llama-3.1-70b-versatile