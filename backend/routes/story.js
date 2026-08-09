const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// SAVE / UPDATE STORY
router.post("/save", async (req, res) => {
  try {
    const { userId, story, storyId } = req.body;

    if (!userId || !story?.genre || !story?.chapters) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // 1️⃣ If storyId provided, try updating existing story
    if (storyId) {
      const existing = await Story.findOne({ _id: storyId, userId });
      if (existing) {
        existing.chapters = story.chapters;
        await existing.save();
        return res.json({
          success: true,
          message: "Story updated successfully",
          storyId: existing._id,
        });
      }
    }

    // 2️⃣ Count how many story blocks user has
    const count = await Story.countDocuments({ userId });

    // 3️⃣ If 9 or more → delete OLDEST story block
    if (count >= 9) {
      const oldestStory = await Story.findOne({ userId }).sort({
        createdAt: 1,
      });

      if (oldestStory) {
        await Story.deleteOne({ _id: oldestStory._id });
      }
    }

    // 4️⃣ Create a NEW story block
    const newStory = new Story({
      userId,
      genre: story.genre,
      chapters: story.chapters,
    });

    await newStory.save();

    res.json({
      success: true,
      message: "Story saved successfully",
      storyId: newStory._id,
    });
  } catch (err) {
    console.error("Save story error:", err);
    res.status(500).json({
      error: "Failed to save story",
    });
  }
});


// GET last 7 stories of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await Story.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7);

    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

module.exports = router;
