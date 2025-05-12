import React, { useState } from "react";

function ControlPanel() {
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [leave, setLeave] = useState(false);

  return (
    <>
      <div className="absolute flex justify-between items-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[20%] bg-black rounded-lg p-4">
        {/* Box 1: Center */}
        <div className="flex justify-center items-center gap-10 w-[60%]">
          <div className="flex-1 text-center text-white">Mic</div>
          <div className="flex-1 text-center text-white">Video</div>
          <div className="flex-1 text-center text-white">Chat</div>
          <div className="flex-1 text-center text-white">Leave</div>
        </div>

        {/* Box 2: Right */}
        <div className="flex justify-center items-end gap-4 w-[30%] text-white">
          <div>Participants</div>
          <div>Chats</div>
          <div>Menu</div>
        </div>
      </div>
    </>
  );
}

export default ControlPanel;
