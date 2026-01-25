import { StoryContext } from "../context/StoryContext";
import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { generateNextEpisode } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { saveStoryToDB } from "../services/saveStory";

export default function StoryPlayer() {
  const { user } = useAuth();
  const THINKING_MESSAGES = [
    "Thinking about your choice…",
    "Adjusting the storyline…",
    "Preparing the next scene…",
    "Finalizing the response…",
  ];
  
  const storyVar = useContext(StoryContext);
  const { genre, tone, length, engine } = storyVar.storyConfig;

  const [episode, setEpisode] = useState(1);
  const [storyText, setStoryText] = useState("");
  const firstChapterGenerated = useRef(false);
  //const [engine, setEngine] = useState("gemini");

  const generateFirstChapter = async () => { 
    try {
      setLoading(true);
      const result = await generateNextEpisode({
        genre,
        tone,
        length,
        episode: 1,
        previousChoice: "Start",
        previousSummary: "",
        scores: { morality: 0, risk: 0, emotion: 0 },
        engine: engine,
      });

      setStoryText(result.storyText);
      setChoices(result.choices);
      setEpisode(1);
      
      //sending data to DB to save if user exists (loggined)
      if (user) {
        saveStoryToDB(user.uid, {
          genre,
          chapters: [
            {
              episode: 1,
              text: result.storyText,
            },
          ],
        });
      }
      
      
    } catch (err) {
      console.error("Failed to generate first chapter:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (firstChapterGenerated.current) return;
    firstChapterGenerated.current = true;
   
    generateFirstChapter();
  }, [genre, tone, length]);

  


//   const [choices, setChoices] = useState([
//     {
//       text: "Look around carefully",
//       effect: "emotion",
//     },
//     {
//       text: "Call out for help",
//       effect: "risk", 
//     },
//   ]);
const [choices, setChoices] = useState([
    {
      text: "Loading...",
      effects: {
        emotion: 2,
        risk: 1,
        morality: 0,
      },
    },
    {
      text: "Loading...",
      effects: {
        risk: 3,
        emotion: -1,
        morality: 2,
      },
    },
]);
const [scores, setScores] = useState({
    morality: 0,
    risk: 0,
    emotion: 0,
});

const [choiceLocked, setChoiceLocked] = useState(false);
const [loading, setLoading] = useState(false);
const [thinkingIndex, setThinkingIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setThinkingIndex((prev) => {
        return (prev + 1) % THINKING_MESSAGES.length;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  const isFallback = storyText?.startsWith("🧠") ;

  const buildPayload = (engineOverride) => ({
    genre,
    tone,
    length,
    episode,
    previousChoice,
    previousSummary,
    scores,
    engine: engineOverride || engine,
  });
  





    // #Number 1 logic
    // function handleChoice(choice) {
    //     // Update scores based on choice
    //     setScores((prev) => ({
    //         morality: choice.effect === "moral" ? prev.morality + 1 : prev.morality,
    //         risk: choice.effect === "risk" ? prev.risk + 1 : prev.risk,
    //         emotion: choice.effect === "emotion" ? prev.emotion + 1 : prev.emotion,
    //     }));

    //     // Move to next episode
    //     setEpisode((prev) => prev + 1);

    //     // Temporary next story (AI will replace this)
    //     setStoryText(
    //         `Episode ${episode + 1}: Your decision has changed the course of the story...`
    //     );

    //     setChoices([
    //         { text: "Help someone in danger", effect: "moral" },
    //         { text: "Escape alone silently", effect: "risk" },
    //     ]);
    // }

    // #Number 2 logic
    // function handleChoice(choice) {
    //     if (choiceLocked) return;
    //     setChoiceLocked(true);


    //     setScores((prev) => ({
    //       morality: prev.morality + (choice.effects.morality || 0),
    //       risk: prev.risk + (choice.effects.risk || 0),
    //       emotion: prev.emotion + (choice.effects.emotion || 0),
    //     }));
      
    //     setEpisode((prev) => prev + 1);
      
    //     setStoryText(
    //       `Episode ${episode + 1}: Your decision has shifted the emotional and moral balance of the story...`
    //     );
      
    //     // Temporary next choices (AI will generate these later)
    //     setChoices([
    //       {
    //         text: "Help someone trapped nearby",
    //         effects: {
    //           morality: +2,
    //           risk: +1,
    //           emotion: +1,
    //         },
    //       },
    //       {
    //         text: "Ignore the noise and escape",
    //         effects: {
    //           morality: -1,
    //           risk: +2,
    //           emotion: -1,
    //         },
    //       },
    //     ]);
    //     // unlock for next episode (temporary delay)
    //     setTimeout(() => setChoiceLocked(false), 500);
    // }

    // #Number 3 logic
  async function handleChoice(choice) {
    if (choiceLocked) return;

    setChoiceLocked(true);
    setLoading(true);

    // 1️⃣ Update scores safely
    setScores((prev) => ({
      morality: prev.morality + (choice.effects?.morality || 0),
      risk: prev.risk + (choice.effects?.risk || 0),
      emotion: prev.emotion + (choice.effects?.emotion || 0),
    }));

    try {
      // 2️⃣ Call backend
      const result = await generateNextEpisode({
        genre,
        tone,
        length,
        episode: episode + 1,
        previousChoice: choice.text,
        previousSummary: storyText,
        scores: {
          morality: scores.morality,
          risk: scores.risk,
          emotion: scores.emotion,
        },
        engine: engine,
      });
      //console.log("BACKEND RESULT 👉", result);

      // 3️⃣ Update UI
      setEpisode((prev) => prev + 1);
      setStoryText(result.storyText);
      setChoices(result.choices);
      if (result.scores) {
        setScores(result.scores);
      }

      //sending data to DB to save if user exists (loggined)
      if (user) {
        saveStoryToDB(user.uid, {
          genre,
          chapters: [
            {
              episode: episode + 1,
              text: result.storyText,
            },
          ],
        });
      }


    } catch (err) {
      console.error("Story generation failed:", err);
    } finally {
      setLoading(false);
      setChoiceLocked(false);
    }
  }
    
      
      
      

  if (!genre || !tone || !length) {
    return <Navigate to="/" replace />;
  }





  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 border-b border-gray-700 pb-4">



          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Your Story</h1>

            {/* Engine badge on RIGHT */}
            <span
              className={`px-4 py-1 rounded-full text-base border transition-all duration-300
                  ${engine === "gemini"
                  ? "border-blue-500 text-blue-400 "
                  : "border-green-500 text-green-400 "
                }`}
            >
              {engine === "gemini" ? "🧠 Gemini" : "⚡ Groq"}
            </span>
          </div>



          <p className="text-gray-400 mt-1">
            Genre: <span className="text-white">{genre}</span> ·
            Tone: <span className="text-white"> {tone}</span> ·
            Length: <span className="text-white"> {length}</span>
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-400 mb-6">
            <span>Morality: {scores.morality}</span>
            <span>Risk: {scores.risk}</span>
            <span>Emotion: {scores.emotion}</span>
        </div>


        {/* Story Content */}

        {/* <div className="bg-gray-900 rounded-xl p-6 min-h-[300px] flex items-center">
          <p className="text-lg leading-relaxed"> */}
            {/* You wake up in a strange place. The air feels heavy, and something
            doesn’t feel right. This is where your story begins... */}
            {/* {storyText}
          </p>
        </div> */}

        {/* <div className="text-lg leading-relaxed min-h-[120px]">
          {loading ? (
            <div className="flex items-center gap-3 text-gray-400 animate-pulse">
              <span>🧠 Generating your story</span>
              <span className="tracking-widest">...</span>
            </div>
          ) : (
            <p>{storyText}</p>    
          )}                       
        </div> */}

        {/* <div className="bg-gradient-to-br from-slate-900 to-slate-800 
                rounded-xl p-6 min-h-[180px] 
                border border-slate-700 shadow-lg">
          {loading ? (
            <div className="text-gray-400 italic animate-pulse">
              {THINKING_MESSAGES[thinkingIndex]}
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-white">
              {storyText}
            </p>
          )}
        </div> */}

        {/* Story Content */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 
                rounded-xl p-6 border border-slate-700">

          {/* Chapter number */}
          {!isFallback && (
          <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-3">
            CHAPTER {episode}
          </h2>
          )}


          {/* Story text OR loading */}
          <div className="min-h-[140px] text-lg leading-relaxed">
            {loading ? (
              <div className="text-gray-400 italic animate-pulse">
                {THINKING_MESSAGES[thinkingIndex]}
              </div>
            ) : (
              <p>{storyText}</p>
            )}
          </div>
        </div>



        {/* {isFallback && (
          <button
            onClick={() => generateFirstChapter()}
            className="mt-5 px-4 py-2 rounded-md border border-gray-600
            text-lg font-medium text-gray-300
            transition-all duration-200 ease-in-out
            hover:border-white hover:text-white hover:bg-white/10
            active:scale-95"
          >
            Retry story generation
          </button>
          mt-4 px-4 py-2 rounded-md border border-gray-600 hover:border-white transition
        )} */}

        {isFallback && (
          <button
            onClick={() => {
              const nextEngine = engine === "gemini" ? "groq" : "gemini";
              storyVar.setStoryConfig({
                genre,
                tone,
                length,
                engine: nextEngine,
              });
              //setEngine(nextEngine);

              if (episode === 1) {
                // Failed at Chapter 1
                generateFirstChapter(buildPayload(nextEngine));
              } else {
                // Failed at Chapter 2+
                generateNextEpisode(buildPayload(nextEngine));
              }
              
              //generateFirstChapter(nextEngine);
            }}
            className="mt-5 px-4 py-2 rounded-md border border-gray-600
            text-lg font-medium text-gray-300
            transition-all duration-200 ease-in-out
            hover:border-white hover:text-white hover:bg-white/10
            active:scale-95"
          >
            Retry with {engine === "gemini" ? "Groq" : "Gemini"}
          </button>
        )}




        {/* Choices (only show if story not ended) */}
        {/* <div className="mt-8 space-y-4">
          {choices.map((choice, index) => (
            <button
              key={index}
              disabled={choiceLocked || loading}
              onClick={() => handleChoice(choice)}
              className={`w-full border rounded-lg p-4 transition
                                  ${choiceLocked
                  ? "border-gray-800 text-gray-500 cursor-not-allowed"
                  : "border-gray-700 hover:border-white"
                }`}
            >
              {choice.text}
            </button>
          ))}
        </div> */}
        {!isFallback && choices.length > 0 && (
          <div className="mt-8 space-y-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                disabled={choiceLocked || loading || choices.length === 0}
                onClick={() => handleChoice(choice)}
                className={`w-full border rounded-lg p-4 transition
                                  ${choiceLocked
                    ? "border-gray-800 text-gray-500 cursor-not-allowed"
                    : "border-gray-700 hover:border-white"
                  }`}
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




