const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateWithGroq(prompt) {
  try {
    console.log("🟢 GROQ API RUNNING");

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_completion_tokens: 1024,
      stream: false,
    });

    console.log("🔥 GROQ RAW RESPONSE:", completion);

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned empty content");
    }

    return content;

  } catch (err) {
    console.error("❌ GROQ FAILURE:", err);
    throw err;
  }
}

module.exports = { generateWithGroq };


//llama-3.1-8b-instant
// llama-3.1-70b-versatile

//llama3-70b-8192




// async function generateWithGroq(prompt) {
//   const completion = await groq.chat.completions.create({
//     model: "llama-3.1-70b-versatile",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//     max_completion_tokens: 1024,
//     //top_p: 1,
//     stream: false,
//     //stop: null
//   });
// //ok
//   console.log("GROQ API RUNNING")
//   console.log("🔥 GROQ RAW RESPONSE:", completion);   // 👈 ADD HERE
//   //console.log("🔥 GROQ TEXT:",completion?.choices?.[0]?.message?.content);
//   //return completion.choices[0].message.content;
//   const content = completion?.choices?.[0]?.message?.content;
//   if (!content) {
//     throw new Error("Groq returned empty response");
//   }
//   return content;
// }



