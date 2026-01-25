// export async function generateNextEpisode(payload) {
//     const response = await fetch("http://localhost:5050/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to generate story");
//     }
  
//     return response.json();
//   }

export async function generateNextEpisode(data) {
  const res = await fetch("http://localhost:5050/api/generate", {
    
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      genre: data.genre,
      tone: data.tone,
      length: data.length,   // ✅ ADD THIS
      episode: data.episode,
      previousChoice: data.previousChoice,
      previousSummary: data.previousSummary,
      scores: data.scores,
      engine: data.engine,
    }),
  });

  if (res.status === 503 || res.status === 500) {
    return {
      storyText: "🧠 The story engine is resting. Please wait a moment and try again.",
      choices: []
    };
  }
  // ❌ other errors
  if (!res.ok) {
    throw new Error("Unexpected server error");
  }

  // ✅ normal success
  return res.json();
}
