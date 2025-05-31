import React from "react";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
// import PricingPage from "./Pages/PricingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
// import MeetingPage from "./Pages/MeetingPage";
// import JoinPage from "./Pages/JoinPage";/
// import MeetingLinkPage from "./Pages/MeetingLinkPage";




// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import JoinPage from "./Pages/JoinPage";
// import MeetingPage from "./Pages/MeetingPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/join" element={<JoinPage />} /> */}
        {/* <Route path="/meeting/:roomId" element={<MeetingPage />} /> */}
        {/* <Route path="/meeting-link/:roomId" element={<MeetingLinkPage />} />/ */}
        {/* <Route path="/" element={<JoinPage />} />
        <Route path="/room/:roomId" element={<MeetingPage />} /> */}
      </Routes>
    </>
  );
}

export default App;