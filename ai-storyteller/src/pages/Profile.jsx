import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUserStories } from "../services/getStoryApi";
import StoryModal from "../components/StoryModal";



export default function Profile() {
  const { user } = useContext(AuthContext);
  const handleChangePassword = async () => {
    if (!user?.email) return;
    if (!isPasswordUser) return;
  
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("Password reset email sent. Check your inbox.");
    } catch (err) {
      alert(err.message);
    }
  };
  const isPasswordUser = user?.providerData?.some(
    (provider) => provider.providerId === "password"
  );

   const [selectedStory, setSelectedStory] = useState(null);
   const [stories, setStories] = useState([]);
//   useEffect(() => {
//     if (!user) return;
  
//     fetch(`http://localhost:5050/api/story/user/${user.uid}`)
//       .then(res => res.json())
//       .then(data => setStories(data))
//       .catch(console.error);
//   }, [user]);

    useEffect(() => {
        if (!user) return;

        getUserStories(user.uid)
            .then(data => setStories(data))
            .catch(() => setStories([]));

    }, [user]);

    const username =
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "User17";



  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Page wrapper */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start">
          {/* Profile Icon */}
          <div className="w-30 h-30 rounded-full border border-white/20 flex items-center justify-center text-5xl mb-4">
            👤
          </div>

          <h1 className="text-2xl font-semibold">Your Profile</h1>
          <p className="text-sm text-white/50 mt-1">
            Manage your account
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="rounded-xl border border-white/10 p-6 bg-white/5">
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-white/50">Email:</span>{" "}
                {user?.email}
              </p>
              {/* <p>
                <span className="text-white/50">User ID:</span>{" "}
                {user?.uid}
              </p> */}
                          <p className="text-sm text-white/70">
                              Username:
                              <span className="ml-2 text-white font-medium">
                                  {username}
                              </span>
                          </p>
            </div>
          </div>


          {/* Saved Stories */}
            <div className="rounded-xl border border-dashed border-white/10 p-11 text-white/40">
            {/* 📚 Your saved stories will appear here. || No saved stories yet */}
          

                  {stories.length === 0 ? (
                      <p className="text-white/50">📚 Your saved stories will appear here</p>
                  ) : (
                              <div className="mt-0 space-y-4">
                                  {stories.map((story, index) => (
                                      <div
                                          key={index}
                                          onClick={() => setSelectedStory(story)}
                                          className="cursor-pointer rounded-lg border border-white/10 p-4 hover:bg-white/5"
                                      >
                                          <p className="text-sm text-white/60">Story {index + 1}</p>
                                          <p className="text-lg font-semibold">Genre: {story.genre}</p>
                                          <p className="text-xs text-white/40">
                                              Chapters: {story.chapters.length}
                                          </p>
                                          {/* <div className="mb-2">
                                            <p className="text-lg text-white/60 font-bold">Story: {story.chapters.length}</p>
                                          </div>
                                          <p className="text-sm font-semibold">Genre: {story.genre}</p>
                                          <p className="text-sm font-semibold">
                                              Chapter: {index + 1}
                                          </p> */}
                                      </div>
                                  ))}
                              </div>
                  )}
            </div>
                  {selectedStory && (
                      <StoryModal
                          story={selectedStory}
                          onClose={() => setSelectedStory(null)}
                      />
                  )}




          
          {/* change password */}
          <div>
                      
                <button
                    disabled={!isPasswordUser}
                    onClick={handleChangePassword}
                    className="mt-9 w-full border border-white/20 py-2.5 rounded-lg hover:bg-white/10 transition"
                >
                    {isPasswordUser? "Change Password":"Change Password (not available because you signed in with Google)"}
                </button>
          </div>


          {/* LOGOUT – bottom */}
            <div className="max-w-6xl mx-auto mt-2">
                <button
                    onClick={() => signOut(auth)}
                    className="w-full border border-red-500/40 text-red-400 py-3 rounded-lg hover:bg-red-500/10 transition"
                >
                    Logout
                </button>
            </div>

        </div>
      </div>

      {/* LOGOUT – bottom */}
      {/* <div className="max-w-6xl mx-auto mt-12">
        <button
          onClick={() => signOut(auth)}
          className="w-full border border-red-500/40 text-red-400 py-3 rounded-lg hover:bg-red-500/10 transition"
        >
          Logout
        </button>
      </div> */}


    </div>
  );
}
