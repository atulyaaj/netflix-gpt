const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video absolute bg-gradient-to-r from-black flex flex-col justify-center px-15 text-white">
      <h1 className="text-6xl font-bold mb-4">{title}</h1>
      <p className="text-lg max-w-xl mb-6">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 text-lg font-semibold rounded hover:bg-white/80">
          ▶ Play
        </button>
        <button className="bg-[rgba(109,109,110,0.7)] text-white px-6 py-2 text-lg font-semibold rounded hover:bg-[rgba(109,109,110,0.4)]">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
