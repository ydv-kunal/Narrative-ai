import { createContext, useState } from "react";

export const StoryContext = createContext();

export function StoryProvider({ children }) {
  const [storyConfig, setStoryConfig] = useState({
    genre: null,
    tone: null,
    length: null,
    engine: null,
  });

  return (
    <StoryContext.Provider value={{ storyConfig, setStoryConfig }}>
      {children}
    </StoryContext.Provider>
  );
}