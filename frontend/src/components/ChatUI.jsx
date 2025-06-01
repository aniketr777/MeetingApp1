import React, { useState } from "react";

const ChatUI = () => {
  const [clicked, setClicked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-4">
      <button
        className="bg-yellow-400 text-black px-4 py-2 rounded-md mb-4"
        onClick={() => setClicked(!clicked)}
      >
        {clicked ? "Close Chat" : "Open Chat"}
      </button>

      {clicked ? (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
          <div className="p-4 bg-black text-yellow-400 font-bold text-center">
            Chat
          </div>

          <div className="p-4 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.length ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md text-white w-fit max-w-[80%] ${
                    msg.sender === "You"
                      ? "bg-yellow-400 text-black self-end"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p>
            )}
          </div>

          <div className="p-4 flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatUI;
