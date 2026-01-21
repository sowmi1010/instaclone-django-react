import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_60%)]" />

      <Navbar />

      {/* Page Content */}
      <div className="relative pt-32 pb-16 px-4">
        <CreatePost />
      </div>

    </div>
  );
}
