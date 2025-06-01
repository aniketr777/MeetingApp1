import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Navbar = () => {

  const time = new Date();
const hours = time.getHours();
const mins=time.getMinutes();

const navItems = [{hours:hours,mins:mins},"Login", "Settings", "Contact"];
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  // Handle Navbar visibility on scroll
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate Navbar appearance/disappearance
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3, // Adjusted duration for snappier feel
      ease: "power3.out", // Added easing
    });
  }, [isNavVisible]);

  // Smooth scrolling handler
  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = -64; // Adjust for navbar height
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-300 sm:inset-x-6 bg-opacity-95 backdrop-blur-md rounded-xl" // Added background and blur
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav
            className="flex size-full items-center justify-between p-4"
            aria-label="Main Navigation"
          >
            {/* Left Section: Logo */}
            <div className="flex items-center gap-3 md:gap-7">
             
              <div className="text-[#ffd52c] font-bold text-lg">MeetPro</div>
            </div>

            {/* Right Section: Navigation Links */}
            
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScroll(item.toLowerCase())}
                    className={`px-4 py-2 transition-colors ${
                      item === "Log In"
                        ? "text-black bg-[#ffd52c] rounded-md"
                        : "text-white hover:text-[#ffd52c]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  className="text-black bg-[#ffd52c] rounded-md hover:bg-[#d4bb59] hover:text-black px-4 py-2 ml-4"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
                <button
                  className="text-black bg-white rounded-md hover:bg-black hover:text-white px-4 py-2 ml-2"
                  onClick={() => navigate("/SignUp")}
                >
                  Sign In
                </button>
              </div>

              <div className="md:hidden">
                {/* Add mobile menu icon and logic */}
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
