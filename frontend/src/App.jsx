import React from "react";
import Login from "./Pages/Login"
import Signin from "./Pages/Signin"
import Home from "./Pages/Home";
import PricingPage from "./Pages/PricingPage";

function App() {
  return (
    <>
      <Home></Home>
      {/* <PricingPage></PricingPage> */}
      <Login></Login>
       <Signin></Signin>
      {/* // <Signin></Signin> */}
      {/* // <Login></Login> */}
    </>
  );
}

export default App;
