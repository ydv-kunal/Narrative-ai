export async function saveStoryToDB(userId, story) {
    try {
        await fetch("http://localhost:5050/api/story/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                story,
            }),
        });
    } catch (err) {
        console.error("Save story failed", err);
    }
}





// export async function saveStoryToDB(userId, story) {
//     try {
//       const res = await fetch("http://localhost:5050/api/story/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId,
//           story,
//         }),
//       });
  
//       if (!res.ok) {
//         throw new Error("Failed to save story");
//       }
//     } catch (err) {
//       console.error("Save story error:", err);
//     }
//   }
  