import React, { useRef, useState } from "react";

function SongItem({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-md border hover:bg-gray-50 transition">
      {/* Left: Image and Text */}
      <div className="flex items-center gap-4">
        <img
          src={song.image}
          alt={song.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{song.title}</h3>
          <p className="text-gray-600 text-sm">{song.artist}</p>
        </div>
      </div>

      {/* Right: Play/Pause Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayback}
          className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition text-xl"
        >
          <i className={isPlaying ? "ri-pause-line" : "ri-play-circle-fill"}></i>
        </button>

        {/* Hidden native audio element */}
        <audio ref={audioRef} src={song.audio} />
      </div>
    </div>
  );
}

export default SongItem;
