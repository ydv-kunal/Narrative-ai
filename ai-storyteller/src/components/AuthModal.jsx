import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";




export default function AuthModal({ onClose, mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return; // ⛔ stop submit
    }
    setLoading(true);

    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // set friendly username
        await updateProfile(result.user, {
          displayName: email.split("@")[0], // simple default username
        });

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      onClose(); // ✅ CLOSE MODAL AFTER SUCCESS
    } catch (err) {
      setError(err.message);
    } finally{
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };


// OKkKKKKKKKKKKKKKKKK
  return ( 
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 rounded-xl bg-zinc-800 p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-gray-100 text-xl font-semibold text-center mb-4">
          {isSignup ? "Create account" : "Login"}
        </h2>

        {/* form goes here */}
        <div className="space-y-4 mb-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-zinc-900 border border-white/10 px-4 py-2 text-white placeholder-white/40 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-zinc-900 border border-white/10 px-4 py-2 text-white placeholder-white/40 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/60"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>



          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

        </div>


        {/* <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-2 rounded-md mt-4 font-medium hover:bg-gray-200 transition"
        >
          {isSignup ? "Create account" : "Login"}
        </button> */}


        <button
          onClick={handleSubmit}
          disabled={!email || !password || loading}
          className="w-full bg-white text-black py-2.5 rounded-md font-medium
          disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-3 text-xs text-white/50">OR</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3
          bg-white text-black py-2 rounded-md
          font-medium border border-gray-300
          hover:bg-gray-100 transition
          disabled:opacity-60 disabled:cursor-not-allowed mt-7"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </button>





        <p
          className="mt-4 text-sm text-center text-blue-400 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Sign up"}
        </p>


      </div>
    </div>
  );
}
