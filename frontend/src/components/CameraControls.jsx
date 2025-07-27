import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

export default function CameraControls({ videoRef }) {
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const startWebcam = () => {
    setIsCameraActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const stopWebcam = () => {
    setIsCameraActive(false);
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  return (
 <div className="bg-gradient-to-br from-[#14494c] via-[#577465] to-[#888c6f] p-4 sm:p-6 rounded-lg text-white relative">

      {isCameraActive && (
        <div className="flex justify-start mb-2">
          <button
            onClick={stopWebcam}
            className="text-white text-2xl hover:text-gray-300 transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
        </div>
      )}

      <div
        className={`transition-opacity duration-500 ${
          isCameraActive ? "opacity-0 pointer-events-none h-0" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl font-bold mb-2">Moody Player</h2>
        <p className="mb-4">
          Discover music that matches your mood. Use your webcam to get real-time emotion-based recommendations.
        </p>

        <button
          onClick={startWebcam}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition"
        >
          <i className="ri-camera-line text-lg"></i>
          Use Webcam
        </button>
      </div>

      {isCameraActive && (
        <video ref={videoRef} autoPlay muted className="w-full h-auto rounded"></video>
      )}
    </div>
  );
}
