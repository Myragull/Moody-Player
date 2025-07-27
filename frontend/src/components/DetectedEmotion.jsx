import React from "react";

function DetectedEmotion({ mood }) {
  const emojiMap = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    surprised: "😲",
    fearful: "😨",
    disgusted: "🤢",
    neutral: "😐",
  };

  const bgMap = {
    happy: "bg-orange-100",
    sad: "bg-blue-100",
    angry: "bg-red-100",
    surprised: "bg-yellow-100",
    fearful: "bg-purple-100",
    disgusted: "bg-green-100",
    neutral: "bg-gray-200",
  };

  // Only show when a mood is detected
  if (!mood) return null;

  return (
    <div className="mt-4 sm:mt-2 w-full  ">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-black font-enter text-lg font-bold">
          Detected Emotion
        </h2>
      </div>

      {/* Mood box */}
      <div className="flex items-center gap-4 border border-gray-100 rounded-[10px] bg-white p-2.5">
        <div
  className={`w-12 h-12 md:h-10 md:w-10 sm:h-8 sm:w-8 rounded-full flex items-center justify-center ${bgMap[mood]}`}
>
  <span className="text-xl md:text-lg sm:text-base leading-none">
    {emojiMap[mood]}
  </span>
</div>

        <p className="capitalize font-semibold text-sm">{mood}</p>
      </div>
    </div>
  );
}

export default DetectedEmotion;
