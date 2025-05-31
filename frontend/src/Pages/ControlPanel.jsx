import React, { useState } from "react";

export default function ControlPanel({ videoRef }) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const toggleMic = () => {
    setMicOn((prev) => !prev);
    // add real media control logic
  };

  const toggleVideo = () => {
    setVideoOn((prev) => !prev);
    if (videoRef.current) {
      const tracks = videoRef.current.srcObject?.getVideoTracks();
      if (tracks?.[0]) tracks[0].enabled = !videoOn;
    }
  };

  const handleScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Screen share failed:", err);
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={toggleMic} className="bg-gray-300 p-2 rounded">
        {micOn ? "Mic On" : "Mic Off"}
      </button>
      <button onClick={toggleVideo} className="bg-gray-300 p-2 rounded">
        {videoOn ? "Camera On" : "Camera Off"}
      </button>
      <button onClick={handleScreenShare} className="bg-gray-300 p-2 rounded">
        Share Screen
      </button>
    </div>
  );
}
