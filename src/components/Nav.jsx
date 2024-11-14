import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import logo1 from "../assets/images/logo.png";
import logo2 from "../assets/svgs/weather.svg";
import { ToastContainer } from "react-toastify"; // Import toast for notifications
import { useStateContext } from "../contexts/WeatherContext";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navVisible, setNavVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // Access the setPlace function from context to update the place value
  const { setPlace } = useStateContext();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      setPlace(searchQuery); // Update the context's place with the search query
    }
  };

 
  const toggleNavVisibility = () => {
    setNavVisible((prev) => !prev);
  };

  // Check screen size and update isSmallScreen state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Small screen if width <= 640px
      if (window.innerWidth > 640) {
        setNavVisible(true); // Keep nav visible on larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      {isSmallScreen && (
        <button
          className="fixed top-4 left-4 z-50"
          onClick={toggleNavVisibility}
        >
          {navVisible ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}
<ToastContainer/>
      <nav
        className={`w-full p-4 md:p-6 flex justify-items-center flex-col md:flex-row justify-between items-center ${
          navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        } transition-all duration-500 ease-in-out z-50 backdrop-blur-xl bg-white/20 rounded-lg shadow-lg border border-white/30`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src={logo1}
            alt="Logo"
            className="w-16 h-10 object-contain rounded-full"
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            WeatherApp
          </h1>
          <img
            src={logo2}
            alt="Logo"
            className="w-20 h-16 object-contain rounded-full"
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-2/3 lg:w-1/3">
          <input
            type="text"
            placeholder="Search for location..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={handleKeyUp}
            className="w-full p-2 pl-10 rounded-full bg-transparent border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ease-in-out duration-300"
          />
          {/* Search Icon */}
          <CiSearch className="absolute right-3 top-1.5 text-3xl" />
        </div>
      </nav>

      {/* Footer */}
      <footer className="text-black absolute bottom-0 w-full bg-white/20 backdrop-blur-xl mt-8 p-4 rounded-lg shadow-lg text-center text-white">
        <p className="text-sm">
          Developed by <span className="font-semibold">MOHAMED LAAGUILI</span> from{" "}
          <span className="font-semibold">MOROCCO</span>,{" "}
          <span className="font-semibold">KSAR EL KEBIR</span>
        </p>
        <p className="text-sm mt-2">
          Visit my{" "}
          <a
            href="https://laaguili.app.genez.io"
            className="font-semibold text-blue-400 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developer Site
          </a>
        </p>
      </footer>
    </>
  );
};

export default Nav;
