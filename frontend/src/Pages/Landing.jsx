import { useEffect, useRef, useState } from "react";
import { Room } from "./Room";

const Landing = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const videoRef = useRef(null);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      setLocalAudioTrack(audioTrack);
      setLocalVideoTrack(videoTrack);

      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream([videoTrack]);
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      getCam();
    }
  }, []);

  if (!joined) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center">
        {/* Header */}
        <div className="w-full bg-gray-900 py-4 px-6 fixed top-0 flex justify-between items-center shadow-md">
          <div className="flex items-center text-yellow-400 font-semibold text-lg gap-2">
            MeetPro | Meeting Setup
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">profile icon</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-24 pt-16 px-6 w-full max-w-7xl">
          {/* Left Section - Instructions and Form */}
          <div className="flex flex-col gap-6 md:w-1/3">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              YOU'RE ABOUT TO JOIN A MEETING
            </p>
            <h1 className="text-4xl font-bold leading-tight text-yellow-400">
              Check Your Mic and Camera
            </h1>
            <p className="text-gray-400 text-lg">
              Ensure everything is set up for a smooth meeting experience.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="rounded-full px-4 py-2 text-black"
                placeholder="Enter Link"
              />
              <button
                className="bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-300 font-semibold transition"
                onClick={() => setJoined(true)}
              >
                Join Meeting
              </button>
            </div>
          </div>

          {/* Right Section - Video Preview and Controls */}
          <div className="flex flex-col gap-6 md:w-1/3">
            {/* Video Preview */}
            <div className="bg-gray-800 h-56 rounded-lg flex items-center justify-center relative overflow-hidden">
              <video
                className="absolute z-10 object-cover w-full h-full rounded-lg"
                autoPlay
                ref={videoRef}
              ></video>
              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex z-20 gap-3">
                <button className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full transition">
                  🎥
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full transition">
                  🎙️
                </button>
                {/* <button className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full transition">
                  ⚙️
                </button> */}
              </div>
            </div>

            {/* Device Settings */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <span className="flex items-center gap-2 text-sm text-gray-300">
                  Camera: Default
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <span className="flex items-center gap-2 text-sm text-gray-300">
                  Microphone: Communications - Headset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};

export default Landing;

{
  /* <video autoPlay ref={videoRef}></video>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={() => setJoined(true)}>Join</button> */
}
