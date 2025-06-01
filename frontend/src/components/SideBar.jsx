import "remixicon/fonts/remixicon.css";

function SideBar() {
  return (
    <div className="p-3 rounded-full bg-zinc-900 flex items-center">
      <div className="flex flex-col justify-between items-center h-full gap-4">
        {/* People Icon */}
        <div
          className="text-2xl flex flex-col text-center"
          style={{ transform: "scaleY(0.9)" }}
        >
          <i className="ri-group-line"></i>
          <div className="text-sm">People</div>
        </div>

        {/* Chat Icon */}
        <div
          className="text-2xl flex flex-col text-center"
          style={{ transform: "scaleY(0.9)" }}
        >
          <i className="ri-chat-3-line"></i>
          <div className="text-sm">Chat</div>
        </div>

        {/* Media Icon */}
        <div
          className="text-2xl flex flex-col text-center"
          style={{ transform: "scaleY(0.9)" }}
        >
          <i className="ri-file-music-line"></i>
          <div className="text-sm">Media</div>
        </div>

        {/* Layout Icon */}
        <div
          className="text-2xl flex flex-col text-center"
          style={{ transform: "scaleY(0.9)" }}
        >
          <i className="ri-layout-line"></i>
          <div className="text-sm">Layout</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
