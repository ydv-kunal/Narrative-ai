export async function getUserStories(userId) {
    try {
      const res = await fetch(
        `http://localhost:5050/api/story/user/${userId}`
      );
  
      if (!res.ok) {
        throw new Error("Failed to fetch stories");
      }
  
      return await res.json();
    } catch (err) {
      console.error("Get stories error:", err);
      return [];
    }
  }
  
//   export async function getUserStories(userId) {
//     const res = await fetch(
//       `http://localhost:5050/api/story/user/${userId}`
//     );
//     return res.json();
//   }
  