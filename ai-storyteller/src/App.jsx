import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StoryPlayer from "./pages/StoryPlayer";
import Header from "./components/Header";
import About from "./pages/About";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* HEADER */}
        <Header />

        <div className="flex-grow">
          {/* PAGES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<StoryPlayer />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}


//Header and  Footer are placed inside <BrowserRouter>, 
// but outside <Routes>. This means they remain fixed on the 
// screen while only the center section (flex-grow) swaps 
// content when navigating between pages.



// Route- A mapping rule that defines "When the URL is path, 
// display element".

