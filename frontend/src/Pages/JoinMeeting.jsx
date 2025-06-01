import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";

const JoinMeeting = () => {
  const [meetingLink, setMeetingLink] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const generateMeetingLink = () => {
    const link = `https://meet.example.com/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setMeetingLink(link);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      setMeetingLink("");
    }, 600000); // Hide popup after 10 minutes (600000 ms)
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    alert("Meeting link copied to clipboard!");
  };

  return (
    <>
      <Navbar2 />
      <div className="bg-black text-white w-full h-screen flex items-center justify-center gap-4 p-4">
        <div className="w-1/2 p-4 ">
          <div className="text-left pl-4">
            <div className="text-5xl  font-thin">
              Video calls and meetings for everyone
            </div>
            <div className="text-2xl font-thin mt-2">
              Connect, collaborate, and celebrate from anywhere with Google Meet
            </div>
          </div>
          <div className="pt-6 flex gap-4">
            <button
              onClick={generateMeetingLink}
              className="bg-yellow-400 w-[30%] rounded-full p-3 text-black"
            >
              New Meeting
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter Meeting Link"
              className={`w-[30%] rounded-full p-3 text-white ${
                inputText.length === 0 ? "border-white" : "border-yellow-400"
              } bg-black border`}
            />
            <button className="text-yellow-400 text-lg font-thin rounded-full p-3 font-semibold">
              Join
            </button>
          </div>
        </div>
        <div className="w-1/2 text-center">
          <img src="" alt="Meeting" className="inline-block" />
        </div>
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-[80%] max-w-md">
            <p className="text-red-600 font-bold mb-2">
              Warning: The link will expire in 10 minutes!
            </p>
            <div className="mb-4">
              <p className="font-semibold">Your Meeting Link:</p>
              <p className="bg-black text-white p-2 rounded">{meetingLink}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-yellow-400 text-black px-4 py-2 rounded-full"
            >
              Copy Link
            </button>
            <button
              onClick={() => setPopupVisible(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-full ml-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinMeeting;
