import React from "react";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import JoinMeeting from "./Pages/JoinMeeting";
import Landing  from "./Pages/Landing";
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/JoinMeeting" element={<JoinMeeting/>}></Route>
        <Route path="/" element={<Landing/>}></Route>
      </Routes>
    </>
  );
}

export default App;
