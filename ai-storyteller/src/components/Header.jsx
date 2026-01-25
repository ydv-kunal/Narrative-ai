import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccountMenu from "./AccountMenu";
import { useState } from "react";
import AuthModal from "./AuthModal";



export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");


  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-300 hover:text-white";

  

  return (
    <header className="sticky top-0 z-50 bg-black/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-semibold tracking-wide text-white hover:opacity-80 transition"
        >
          {/* AI Story */}
          Narrative AI
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex gap-9 text-base">
          <Link to="/" className={`${isActive("/")}`}>
            Home
          </Link>
          <Link to="/about" className={`${isActive("/about")}`}>
            About
          </Link>
        </nav>



        {/* AUTH */}
        {/* <div className="flex gap-3">
          <button className="px-4 py-1.5 text-base rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white transition">
            Login
          </button>

          <button className="px-4 py-1.5 text-base rounded-lg bg-white text-black hover:bg-gray-200 transition">
            Sign up
          </button>
        </div> */}




        {/* {!user ? (
          <>
            <button onClick={() => setShowAuth(true)}>Login</button>
            <button onClick={() => setShowAuth(true)}>Sign up</button>
          </>
        ) : (
          <AccountMenu />
        )}

        {showAuth && (
          <AuthModal onClose={() => setShowAuth(false)} />
        )} */}

        <header className="...">
          <div className="flex items-center justify-between gap-3">
            {/* left side logo / links */}



            {/* right side auth */}
            {!user ? (
              <>
                <button className="px-4 py-1.5 text-base rounded-lg border border-white/20 
                text-white/80 hover:text-white hover:border-white transition"
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuth(true);
                  }}
                >
                  Login
                </button>


                <button className="px-4 py-1.5 text-base rounded-lg bg-white text-black 
                hover:bg-gray-200 transition"
                  onClick={() => {
                    setAuthMode("signup");
                    setShowAuth(true);
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <AccountMenu />
            )}
          </div>


          {/* 🔽 ADD AuthModal HERE */}
          {showAuth && (
            <AuthModal 
            mode={authMode}
            onClose={() => setShowAuth(false)} />
          )}
        </header>


      </div>
    </header>
  );
}
