import React, { useState } from "react";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("User Data:", userData);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="bg-black w-full lg:w-1/2 flex flex-col px-6 py-4 relative">
        <div className="absolute top-4 left-6 text-lg font-thin border border-white rounded-3xl px-4 py-2 text-gray-100">
          Meet Pro
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <div className="w-full md:w-3/4 lg:w-[60%] py-4">
            <div className="text-3xl font-semibold text-gray-100 mb-2 text-center">
              Create an account
            </div>
            <div className="text-lg text-gray-100 mb-6 text-center">
              Sign up and get 30 days free trial
            </div>
            <form className="w-full space-y-4 px-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Full name"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-yellow-500 text-white text-lg p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-between items-center mt-6 px-4">
              <button className="flex-1 bg-black text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 mx-1 border border-white">
                Apple
              </button>
              <button className="flex-1 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 mx-1">
                Google
              </button>
            </div>
          </div>
          <div className="mt-10 w-full md:w-3/4 lg:w-[60%] flex justify-between items-center absolute bottom-4">
            <div className="text-gray-100">
              Have an account?{" "}
              <span className="text-yellow-600 underline cursor-pointer">
                Sign in
              </span>
            </div>
            <div className="text-gray-100">
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
        style={{ backgroundImage: `url('/public/img/log.png')` }}
      >
        {/* <div className="absolute top-4 right-4 bg-yellow-500 text-black rounded-full px-4 p-2 cursor-pointer">
          ✕
        </div> */}
        <div className="absolute top-16 left-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-sm text-gray-500">Task Review With Team</div>
          <div className="text-lg text-gray-800 font-semibold">
            09:30am-10:00am
          </div>
        </div>
        <div className="absolute bottom-16 left-6 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-lg text-gray-800 font-semibold">
            Daily Meeting
          </div>
          <div className="text-sm text-gray-500">12:00pm-01:00pm</div>
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
