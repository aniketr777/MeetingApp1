import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { start } from "repl";
gsap.registerPlugin(ScrollTrigger);

function PricingPage() {

useEffect(() => {
  gsap.fromTo(
    "#pricing",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#pricing",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}, []);

  const [isAnnual, setIsAnnual] = useState(false);
  const [prices, setPrices] = useState({
    Free: 0,
    Pro: 0,
    Enterprise: 0,
  });

  const pricingPlans = [
    {
      name: "Free",
      monthly: "$0 per month",
      annual: "$0 per year",
      targetMonthly: 0,
      targetAnnual: 0,
      title: "Explore the product and power small, personal projects.",
      features: ["500 Encrypts", "500 Decrypts", "250 Cage Runs"],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      monthly: "$395 per month",
      annual: "$4,740 per year",
      targetMonthly: 395,
      targetAnnual: 4740,
      title: "Run production apps with full functionality.",
      features: [
        "Unlimited Encrypts",
        "5,000 Decrypts - $0.02 per Decrypt",
        "2,500 Cage Runs - $0.04 per Cage Run",
      ],
      buttonText: "Start Free Trial",
      isPopular: true,
    },
    {
      name: "Enterprise",
      monthly: "Custom Pricing",
      annual: "Custom Pricing",
      targetMonthly: null,
      targetAnnual: null,
      title:
        "Run compliant production apps with full functionality, onboarding, and support.",
      features: [
        "Unlimited Encrypts",
        "Custom Decrypts",
        "Custom Cage Runs",
        "Fast-tracked PCI & HIPAA",
      ],
      buttonText: "Contact Sales",
    },
  ];

  useEffect(() => {
    setPrices({
      Free: 0,
      Pro: 0,
      Enterprise: 0,
    });

    const counters = {};
    const duration = 2000;

    pricingPlans.forEach((plan) => {
      const target = isAnnual ? plan.targetAnnual : plan.targetMonthly;
      if (target !== null) {
        counters[plan.name] = {
          current: 0,
          target: target,
          increment: target / (duration / 50),
        };
      }
    });

    const interval = setInterval(() => {
      setPrices((prevPrices) => {
        const newPrices = { ...prevPrices };
        let allDone = true;

        Object.keys(counters).forEach((name) => {
          const counter = counters[name];
          if (counter.current < counter.target) {
            counter.current += counter.increment;
            if (counter.current > counter.target) {
              counter.current = counter.target;
            }
            newPrices[name] = Math.round(counter.current);
            allDone = false;
          }
        });

        if (allDone) {
          clearInterval(interval);
        }
        return newPrices;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAnnual]);


  return (
    <div className="relative min-h-[110dvh] w-full bg-black overflow-x-hidden">
      {/* <Navbar /> */}
      <div className="flex relative flex-col gap-6 justify-normal items-center text-white pt-6 md:pt-10 px-4 sm:px-6 lg:px-8">
        <h1  id="pricing" className="text-3xl sm:text-4xl font-thin">Pricing</h1>
        <p className="text-zinc-400 text-center text-base sm:text-lg max-w-2xl">
          Safely collect, process, and share your data <br />
          with the plan that's right for you.
        </p>

        {/* Toggle Design */}
        <div className="flex justify-center p-4 w-full max-w-md">
          <div className="inline-flex bg-gray-900 rounded-xl p-1 border border-gray-800 shadow-lg w-full justify-between">
            <button
              className={`flex-1 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                !isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
              {!isAnnual && (
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                isAnnual
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
              {isAnnual ? (
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Active
                </span>
              ) : (
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-green-500/20 text-green-300 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl gap-6 px-2 sm:px-4 lg:px-10">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-black text-left rounded-3xl text-sm p-4 sm:p-6 border border-gray-100 hover:border-yellow-500 hover:scale-105 transition-transform duration-500 ${
                plan.isPopular
                  ? "z-10 scale-100 sm:scale-105 shadow-lg border-zinc-100 hover:scale-105 sm:hover:scale-110"
                  : ""
              }`}
            >
              <div className="absolute top-0 right-0 overflow-auto rounded-3xl w-[50%] h-[50%] rotate-135 blur-bg z-[-1]"></div>
              {plan.isPopular && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
              <h2 className="text-lg sm:text-xl font-semibold">{plan.name}</h2>
              <div className="my-3 sm:my-4 flex items-baseline">
                <p className="text-lg sm:text-xl font-bold">
                  {plan.targetMonthly === null
                    ? isAnnual
                      ? plan.annual
                      : plan.monthly
                    : `$${prices[plan.name].toLocaleString()}`}
                </p>
                {plan.targetMonthly !== null && (
                  <div className="text-gray-400 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    {isAnnual ? "per Year" : "per Month"}
                  </div>
                )}
              </div>
              <p className="text-gray-400 mb-4 text-xs sm:text-sm">
                {plan.title}
              </p>
              <ul className="text-gray-300 space-y-2 text-xs sm:text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="pb-2 border-b border-gray-600 last:border-none"
                  >
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              {plan.isPopular && (
                <span className="text-[10px] sm:text-xs font-semibold block mt-2">
                  Try pro for free for 30-days trial.
                </span>
              )}
              <button className="mt-4 sm:mt-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-600 transition duration-300 ease-in-out text-xs sm:text-sm w-full sm:w-auto">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
