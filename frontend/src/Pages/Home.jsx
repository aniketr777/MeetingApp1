import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero"
import PricingPage from "./PricingPage";
import About from "./About"
import Footer from "../components/Footer"
import JoinMeeting from "./JoinMeeting";
// import MeetingPage from "../Pages/MeetingPage"
function Home() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <About></About>
        <PricingPage></PricingPage>
        {/* <JoinMeeting></JoinMeeting> */}
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
