const VideoStream = ({ videoRef, label }) => (
  <div className="flex flex-col items-center">
    <video
      ref={videoRef}
      autoPlay
      muted={label === "You"}
      className="w-64 h-48 bg-black rounded border-2 border-yellow-500"
    />
    <p className="mt-2 text-white">{label}</p>
  </div>
);

export default VideoStream;
