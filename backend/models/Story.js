const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  episode: Number,
  text: String,
});

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    chapters: [chapterSchema],
  },
  { timestamps: true } // needed to delete oldest story
);

module.exports = mongoose.model("Story", storySchema);





//     // Story content
//     chapters: [
//       {
//         episode: Number,
//         text: String,
//       },
//     ],
//   },
//   {
//     timestamps: true, // adds createdAt & updatedAt automatically
//   }
// );
// module.exports = mongoose.model("Story", storySchema);