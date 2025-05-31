import { useParams, useNavigate, Link } from "react-router-dom";

const MeetingLinkPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const meetingLink = `https://localhost:5000/meeting/${roomId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied to clipboard!");
  };

  const joinMeeting = () => {
    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4 text-white">Meeting Created</h1>
      <p className="text-white mb-4">
        Your Meeting Link:{" "}
        <span className="font-bold text-yellow-500">{meetingLink}</span>
      </p>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={copyLink}
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
        >
          Copy Link
        </button>
        <button
          onClick={joinMeeting}
          className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
        >
          Join Meeting
        </button>
      </div>
      <Link to="/" className="text-yellow-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default MeetingLinkPage;
