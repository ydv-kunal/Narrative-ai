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
          </ProtectedRoute> }
        />
      </Routes>
    </div>

    <Footer />
  </div>
  </BrowserRouter>
  );
}
