import React from "react";
import {useRef} from "react"
// import {Button} from "../Button/Button"
function Hero() {
  const heroRef=useRef(null);
  return (
    <>
      <section
        ref={heroRef}
        className="min-h-screen flex items-center bg-black relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="hero-text text-5xl md:text-7xl font-bold leading-tight text-white">
                Effortless Meetings,{" "}
                <span className="text-yellow-400">Anywhere.</span>
              </h1>
              <p className="hero-text text-xl text-gray-300">
                Seamlessly connect with your team, clients, and collaborators
                through a reliable and easy-to-use platform.
              </p>
              <div className="hero-text flex space-x-4">
                <button className="px-8 py-4 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-bold hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Virtual meeting interface"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
