import { useState } from "react";
import { useContext } from "react";
import { StoryContext } from "../context/StoryContext";
import { useNavigate } from "react-router-dom";
import AiSelector from "../components/AiSelector";
import { useAuth } from "../context/AuthContext";




export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedTone, setSelectedTone] = useState(null);
  const [selectedLength, setSelectedLength] = useState(null);
  const storyVar = useContext(StoryContext);
  const navigate = useNavigate();
  const [engine, setEngine] = useState("gemini");
  const { user } = useAuth();




  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI Interactive Storytelling
        </h1>
        <p className="text-gray-400 text-lg">
          Create cinematic stories where your choices shape the world, the characters,
          and the ending.
        </p>        
        </section>


        {/* HOW IT WORKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">① Pick a genre</h3>
            <p className="text-sm text-white/60">
              Choose the world your story begins in.
            </p>
          </div>
          <div className="border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">② Read & choose</h3>
            <p className="text-sm text-white/60">
              Each chapter gives you choices to decide what happens next.
            </p>
          </div>
          <div className="border border-white/10 rounded-xl p-5">
            <h3 className="font-semibold mb-2">③ Shape the ending</h3>
            <p className="text-sm text-white/60">
              Your decisions affect the story and the ending.
            </p>
          </div>
        </div>
        



{/* remove */}
        {/* Sections */}
        <div className="space-y-10">
        <div>
            <h2 className="text-xl font-semibold mb-4">Choose Genre</h2>
            <p className="text-sm text-white/50 mb-4">
              Each genre creates a different kind of world.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["Thriller", "Fantasy", "Sci-Fi", "Romance", "Horror", "Crime"].map(
                (genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`border rounded-lg p-4 transition
                                ${selectedGenre === genre
                        ? "border-white bg-white text-black"
                        : "border-gray-700 hover:border-white"
                      }`}
                  >
                    {genre}
                  </button>
                ))}
            </div>
          </div>



          <div>
            <h2 className="text-xl font-semibold mb-4">Story Tone</h2>
            <p className="text-sm text-white/50 mb-4">
              This controls the mood of the story.
            </p>
            <div className="flex gap-4">
              {["Dark", "Emotional", "Light"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-6 py-3 rounded-full border transition
                    ${selectedTone === tone
                      ? "border-white bg-white text-black"
                      : "border-gray-700 hover:border-white"
                    }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
          

          <div>
            <h2 className="text-xl font-semibold mb-4">Story Length</h2>
            <p className="text-sm text-white/50 mb-4">
              Short = quick story · Long = full adventure
            </p>
            <div className="flex gap-4">
              {["Short", "Medium", "Long"].map((length) => (
                <button
                  key={length}
                  onClick={() => setSelectedLength(length)}
                  className={`px-6 py-3 rounded-lg border transition
                    ${selectedLength === length
                      ? "border-white bg-white text-black"
                      : "border-gray-700 hover:border-white"
                    }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {/* <div className="flex gap-9">
          <h3 className="mt-8 mb-3 text-lg font-semibold">Story Engine : </h3>

          <AiSelector
            value={engine}
            onChange={(val) => setEngine(val)}
          />
          </div> */}
          <div className="mt-10 flex gap-5 content-center">
            <h3 className="text-lg font-semibold mt-5">Story Engine (AI brain) <br />
              <p className="text-xs text-white/40 mt-2">
                You can switch engines if one is unavailable.
              </p></h3>
            <div>
              <AiSelector value={engine} onChange={(val) => setEngine(val)} />
            </div>
          </div>
          

          

          {/* Start Button */}
          <div className="mt-9 mb-15 flex gap-5 content-center items-center">
            <button
              disabled={!selectedGenre || !selectedTone || !selectedLength || !user}
              onClick={() => {
                storyVar.setStoryConfig({
                  genre: selectedGenre,
                  tone: selectedTone,
                  length: selectedLength,
                  engine: engine,
                });

                navigate("/story");
              }}
              className={`mt-4 px-8 py-5 rounded-lg text-xl font-semibold transition
                                ${selectedGenre && selectedTone && selectedLength && engine && user
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
            >
              Start Your Story →
            </button>


            {!user && (
              <p className=" text-sm text-gray-400">
                ( 🔒 Please login to start your story )
              </p>
            )}
          </div>



          {/* PREVIEW */}
        <section className="border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold mb-3">Preview</h3>
          <p className="text-white/70 mb-4">
            You wake up in a dark room.  
            A strange sound comes from the door.
          </p>

          <div className="flex gap-4">
            <button className="px-4 py-2 border border-white/20 rounded opacity-50">
              Open the door
            </button>
            <button className="px-4 py-2 border border-white/20 rounded opacity-50">
              Stay quiet
            </button>
          </div>
        </section>


        </div>
      </div>
    </div>
  );
}