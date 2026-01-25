import { useState,useEffect } from "react";

export default function StoryModal({ story, onClose }) {
  const [index, setIndex] = useState(0);

  // safety check
  //if (!story?.chapters?.length) return null;

    // ✅ reset chapter when new story opens
    // useEffect(() => {
    //     setIndex(0);
    // }, [story]);

  const chapter = story.chapters[index];

  //clear 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-2xl bg-zinc-900 rounded-xl p-6 border border-white/10 text-white">
        
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">
          Genre: {story.genre}
        </h2>

        <p className="text-sm text-white/60 mb-4">
          Chapter {chapter.episode}
        </p>

        <p className="leading-relaxed mb-6">
          {chapter.text}
        </p>

        {/* navigation */}
        <div className="flex justify-between items-center">
          <button
            disabled={index === 0}
            onClick={() => setIndex(i => i - 1)}
            className="px-4 py-2 border border-white/20 rounded disabled:opacity-30"
          >
            ← Back
          </button>

          {/* <span className="text-xs text-white/40">
            {index + 1} / {story.chapters.length}
          </span> */}

          <button
            disabled={index === story.chapters.length - 1}
            onClick={() => setIndex(i => i + 1)}
            className="px-4 py-2 border border-white/20 rounded disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}