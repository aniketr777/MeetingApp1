import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("User Credentials:", credentials);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-black w-full lg:w-1/2 flex flex-col px-6 py-4 relative">
        <div className="absolute top-4 left-6 text-lg font-thin border border-white rounded-3xl px-4 py-2 text-gray-100">
          Meet Pro
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full md:w-3/4 lg:w-[60%] py-4">
            <div className="text-3xl font-semibold text-gray-100 mb-2 text-center">
              Welcome Back
            </div>
            <div className="text-lg text-gray-100 mb-6 text-center">
              Login in to continue your journey
            </div>
            <form className="w-full space-y-4 px-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-yellow-500 text-white text-lg p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Login In
              </button>
            </form>
            <div className="mt-4 text-gray-100 text-center">
              Forgot your password?{" "}
              <span className="text-yellow-600 underline cursor-pointer">
                Reset it
              </span>
            </div>
          </div>
          {/* Sign In with Google/Apple */}
          <div className="w-full md:w-3/4 lg:w-[60%] mt-6 flex flex-col space-y-4 px-4">
            <button className="flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md">
              <img
                src="/public/img/google-icon.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Log in with Google
            </button>
            <button className="flex items-center justify-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
              <img
                src="/public/img/apple-icon.png"
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Log in with Apple
            </button>
          </div>
          <div className="mt-10 w-full md:w-3/4 lg:w-[65%] flex justify-between items-center absolute bottom-4">
            <div className="text-gray-100">
              Already have an account? 
              <Link to="/SignUp" className="text-yellow-600 underline cursor-pointer">
                Create an account       
              </Link>
            </div>
            <div className=" text-gray-100">
              <span className="underline cursor-pointer">
                Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-1/2 bg-cover bg-center hidden lg:flex relative"
        // style={{ backgroundImage: url('img/signin-bg.png') }}
      >
        <div className="absolute top-4 right-4 bg-yellow-500 text-black rounded-full p-2 cursor-pointer">
          ✕
        </div>
        <div className="absolute top-16 left-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500">Upcoming Event</div>
          <div className="text-lg text-gray-800 font-semibold">
            10:00am-11:00am
          </div>
        </div>
        <div className="absolute bottom-16 left-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-lg text-gray-800 font-semibold">
            Team Briefing
          </div>
          <div className="text-sm text-gray-500">03:00pm-04:00pm</div>
          <div className="flex mt-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 border border-white -ml-2"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 border border-white -ml-2"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 border border-white -ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;