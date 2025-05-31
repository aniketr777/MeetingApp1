import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero"
import PricingPage from "../Pages/PricingPage";
import About from "./About"
import Footer from "../components/Footer"
// import MeetingPage from "../Pages/MeetingPage"
function Home() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <Hero></Hero>
        <About></About>
        <PricingPage></PricingPage>
        <Footer></Footer>

      </div>
    </>
  );
}

export default Home;
