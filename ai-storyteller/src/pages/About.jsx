export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About AI Story</h1>
          <p className="text-white/60 max-w-3xl mx-auto">
            AI Story is an interactive storytelling app where your choices shape
            the story. Every chapter is written by AI, just for you.
          </p>
        </div>

        {/* What is AI Story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What is AI Story?</h2>
          <p className="text-white/70 leading-relaxed">
            AI Story is a choice-driven storytelling experience powered by
            modern AI. Instead of reading a fixed story, you actively decide
            what happens next. Each decision changes the path of the story,
            making every experience unique.
          </p>
        </section>

        {/* How it works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">How it works</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="font-semibold mb-2">🎭 Set the story</h3>
              <p className="text-white/60">
                Choose a genre, tone, and story length (Short, Medium, or Long)
                to decide how your story begins and how many chapters it has.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="font-semibold mb-2">📖 Read each chapter</h3>
              <p className="text-white/60">
                The AI writes one chapter at a time in very easy English,
                perfect for young readers and beginners.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="font-semibold mb-2">🧭 Make choices</h3>
              <p className="text-white/60">
                After every chapter, you choose what to do next. Each choice
                affects how the story continues.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 p-6">
              <h3 className="font-semibold mb-2">🔁 Watch it evolve</h3>
              <p className="text-white/60">
                Your decisions directly shape future chapters and the final
                ending of the story.
              </p>
            </div>
          </div>
        </section>

        {/* Choices & Scores */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your choices matter</h2>
          <ul className="space-y-2 text-white/70">
            <li>
              <strong>Morality</strong> — shows how kind or harsh your decisions are.
            </li>
            <li>
              <strong>Risk</strong> — shows how dangerous the path you choose becomes.
            </li>
            <li>
              <strong>Emotion</strong> — tracks how your actions affect feelings and relationships.
            </li>
          </ul>
        </section>

        {/* AI Engines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Powered by smart AI</h2>
          <p className="text-white/70">
            AI Story uses multiple AI engines such as <strong>Gemini</strong> and
            <strong> Groq</strong> to generate chapters. If one engine is unavailable,
            the app can switch to another without breaking your story flow.
          </p>
        </section>

        {/* Saved Stories */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your saved stories</h2>
          <p className="text-white/70">
            When you are logged in, your stories are saved automatically.
            You can view your last <strong>7 stories</strong> from your profile
            and read all chapters using simple Previous and Next buttons.
          </p>
        </section>

        {/* Who it is for */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Who is this for?</h2>
          <ul className="space-y-2 text-white/70">
            <li>• Kids and beginners who want simple English stories</li>
            <li>• People who love interactive storytelling</li>
            <li>• Anyone who wants fun, creative, AI-powered experiences</li>
          </ul>
        </section>

        {/* Footer line */}
        <div className="text-center pt-10 text-white/50 italic">
          Start a story. Make choices. Shape your own adventure.
        </div>
      </div>
    </div>
  );
}
