import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { UserPlus, UserMinus, Users, Image } from "lucide-react";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  const myUsername = localStorage.getItem("username");

  useEffect(() => {
    api.get("posts/mine/").then((res) => setPosts(res.data));
    api.get("users/").then((res) => setUsers(res.data));
    api.get(`following/me/`).then((res) => setFollowing(res.data));
  }, []);

  const handleFollow = async (userId) => {
    await api.post(`follow/${userId}/`);
    window.location.reload();
  };

  const handleUnfollow = async (userId) => {
    await api.post(`unfollow/${userId}/`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Neon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_60%)]" />

      <Navbar />

      <div className="relative pt-36 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Left Profile Panel */}
          <div className="lg:col-span-1 space-y-6">

            {/* Profile Card */}
            <div className="bg-black/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.4)] p-6 text-center">

              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-70"></div>
                <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-bold text-purple-300 border border-purple-500">
                  {myUsername?.charAt(0).toUpperCase()}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-purple-300 mb-4">
                {myUsername}
              </h2>

              {/* Stats */}
              <div className="flex justify-around text-center mt-6">
                <div>
                  <p className="text-xl font-bold text-white">{posts.length}</p>
                  <p className="text-gray-400 text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{following.length}</p>
                  <p className="text-gray-400 text-sm">Following</p>
                </div>
              </div>
            </div>

            {/* People Panel */}
            <div className="bg-black/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.25)] p-6">

              <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <Users size={20} /> People
              </h3>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/40">

                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center bg-black/50 border border-purple-500/10 rounded-xl px-4 py-3 hover:border-purple-500/40 transition"
                  >
                    <span className="text-gray-200">{user.username}</span>

                    {following.includes(user.id) ? (
                      <button
                        onClick={() => handleUnfollow(user.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-500"
                      >
                        <UserMinus size={16} /> Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(user.id)}
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-500"
                      >
                        <UserPlus size={16} /> Follow
                      </button>
                    )}
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Right Posts Panel */}
          <div className="lg:col-span-3">

            <div className="flex items-center gap-3 mb-10">
              <Image className="text-purple-400" size={26} />
              <h2 className="text-3xl font-bold text-purple-300">
                My Posts
              </h2>
            </div>

            {posts.length === 0 && (
              <p className="text-gray-500">No posts yet</p>
            )}

            <div className="space-y-12">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
