import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AccountMenu() {
  const { user } = useAuth();     // logged-in user
  const [open, setOpen] = useState(false);

  const username =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User17";

  return (
    <div className="relative ">
      {/* Account Icon */}
      {/* <div
        onClick={() => setOpen(!open)}
        className="w-11 h-11 flex items-center justify-center
        rounded-full border border-white/70
        hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]
        cursor-pointer transition"
      >
        {user && (
            <span className="text-sm text-white/70">
              Hey, <span className="text-white font-medium">{username}</span>
            </span>
          )}
        <span className="text-lg">👤</span>
      </div> */}

      {/* Greeting */}
      <div className="flex gap-4 item-center">
        {user && (
        <span className="text-[15px] text-white/70 mt-3">
          Hey, <span className="text-white font-medium">{username}</span>
        </span>
      )}

      {/* Profile Icon */}
      <div
        onClick={() => setOpen(!open)}
        className="w-11 h-11 flex items-center justify-center
        rounded-full border border-white/70
        hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]
        cursor-pointer transition"
      >
        <span className="text-lg">👤</span>
      </div>
      </div>
      

      {/* Dropdown */}
      {open && (
        <div className="text-gray-100 absolute right-0 mt-2 w-40 bg-black border border-white/20 rounded-lg">
          
          <Link
            to="/Profile"
            className="block px-4 py-2 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={() => signOut(auth)}
            className="w-full text-left px-4 py-2 hover:bg-white/10 text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}