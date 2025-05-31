const MeetingControls = ({
  localStream,
  peerConnection,
  isVideoOn,
  setIsVideoOn,
  isAudioOn,
  setIsAudioOn,
  isScreenSharing,
  setIsScreenSharing,
  localVideoRef,
}) => {
  const toggleVideo = () => {
    const videoTrack = localStream?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    const audioTrack = localStream?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);
    }
  };

  const toggleScreenSharing = async () => {
    if (!isScreenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection
        .getSenders()
        .find((s) => s.track.kind === "video");
      sender.replaceTrack(screenTrack);
      localVideoRef.current.srcObject = screenStream;
      setIsScreenSharing(true);

      screenTrack.onended = () => {
        const videoStream = localStream;
        const videoTrack = videoStream.getVideoTracks()[0];
        sender.replaceTrack(videoTrack);
        localVideoRef.current.srcObject = videoStream;
        setIsScreenSharing(false);
      };
    }
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={toggleVideo}
        className={`px-4 py-2 rounded text-black ${
          isVideoOn
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        {isVideoOn ? "Turn Off Video" : "Turn On Video"}
      </button>
      <button
        onClick={toggleAudio}
        className={`px-4 py-2 rounded text-black ${
          isAudioOn
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        {isAudioOn ? "Mute Audio" : "Unmute Audio"}
      </button>
      <button
        onClick={toggleScreenSharing}
        className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
      >
        {isScreenSharing ? "Stop Sharing" : "Share Screen"}
      </button>
    </div>
  );
};

export default MeetingControls;
