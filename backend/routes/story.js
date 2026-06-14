const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// SAVE STORY
router.post("/save", async (req, res) => {
  try {
    const { userId, story } = req.body;

    if (!userId || !story?.genre || !story?.chapters) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // 1️⃣ Count how many story blocks user has
    const count = await Story.countDocuments({ userId });

    // 2️⃣ If more than 9 → delete OLDEST story block
    if (count >= 9) {
      const oldestStory = await Story.findOne({ userId }).sort({
        createdAt: 1,
      });

      if (oldestStory) {
        await Story.deleteOne({ _id: oldestStory._id });
      }
    }

    // 3️⃣ ALWAYS create a NEW story block
    const newStory = new Story({
      userId,
      genre: story.genre,
      chapters: story.chapters,
    });

    await newStory.save();

    res.json({
      success: true,
      message: "Story saved successfully",
    });
  } catch (err) {
    console.error("Save story error:", err);
    res.status(500).json({
      error: "Failed to save story",
    });
  }
});


// GET last 2 stories of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await Story.find({ userId })
      // Commented out sort({ createdAt: 1 }) because it sorts in ascending order (oldest first).
      // We want to retrieve the last 7 stories in descending order (newest first) by using sort({ createdAt: -1 }).
      // .sort({ createdAt: 1 }) // newest first
      .sort({ createdAt: -1 })
      .limit(7);

    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});
module.exports = router;




// sort({ createdAt: 1 }) //older firse  → ascending order
// sort({ createdAt: -1 }) // newest first  → descending order






// const { userId, story } = req.body;

//     // 1️⃣ Safety check
//     if (!userId || !story?.genre || !story?.chapters ) {
//       return res.status(400).json({
//         error: "Missing userId or story",
//       });
//     }

//     // 2️⃣ Count how many stories user already has
//     const count = await Story.countDocuments({ userId });

//     // 3️⃣ If user already has 7 stories → delete oldest one
//     // Max 7 stories per user
//     if (count >= 7) {
//       const oldestStory = await Story.findOne({ userId }).sort({
//         createdAt: 1,
//       });

//       if (oldestStory) {
//         await Story.deleteOne({ _id: oldestStory._id });
//       }
//     }

//     // 4️⃣ Save new story
//     const newStory = new Story({
//       userId,
//       genre: story.genre,
//       chapters: story.chapters,
//     });

//     await newStory.save();

//     // 5️⃣ Send success response
//     res.json({
//       success: true,
//       message: "Story saved successfully",
//     });