import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-black flex items-center justify-center"
    >
      <div className="max-w-4xl text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Welcome to{" "}
          <span className="text-[#ffd52c] font-semibold">MeetPro</span>, your
          go-to platform for seamless and professional connections. We are
          dedicated to bringing people together through innovative technology
          and reliable tools that inspire productivity.
        </p>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          Our mission is to empower teams and individuals to collaborate, share
          ideas, and achieve their goals. Whether you're working on a big
          project or a small task, MeetPro is here to help you succeed.
        </p>
        <div className="mt-8">
          <button className="bg-[#ffd52c] text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
