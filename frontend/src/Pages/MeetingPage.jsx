import React from "react";
import { useState } from "react";
import ControlPanel from "./ControlPanel";
function MeetingPage() {
  const [presenting,setPresenting] =useState(false);
  return (
    <>
      <div className="w-full bg-black text-white h-screen">
        <div className="h-[90%]">
          {presenting && <div className="flex">
            <div id="largebox" className="w-[50%] bg-red-400 h-full "></div>
            for </div>}
        </div>
        <div className="relative h-[10%]">
          <ControlPanel></ControlPanel>
        </div>
      </div>
    </>
  );
}

export default MeetingPage;
