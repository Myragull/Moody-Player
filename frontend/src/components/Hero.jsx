import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import CameraControls from "./CameraControls";
import DetectionPanel from "./DetectionPanel";


function Hero({ setMood }) {
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);
 
  const detectMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let highest = 0;
    let expression = "";

    for (const [key, value] of Object.entries(detections[0].expressions)) {
      if (value > highest) {
        highest = value;
        expression = key;
      }
    }

    setMood(expression); // 🔥 pass mood up
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-6 lg:px-8">
      <p className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-left">
        Live Mood Detection
      </p>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[55%]">
          <CameraControls videoRef={videoRef} />
        </div>

        <div className="w-full lg:w-[45%]">
          <DetectionPanel onDetect={detectMood} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
