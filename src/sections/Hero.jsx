import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Html } from '@react-three/drei';
import HackerRoom from "../components/HackerRoom";
import { Suspense, useState, useEffect } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { Leva } from 'leva';
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import { useSpring, animated } from '@react-spring/three';
import Navbar from "./Navbar"; // Import your existing Navbar

const Hero = () => {
  const [isZoomed, setIsZoomed] = useState(false); // Track if the model is zoomed
  const [activeSection, setActiveSection] = useState("home"); // Track the active section for texture
  const [workZoom, setWorkZoom] = useState(false); // Track if we're zoomed into the work monitor
  const [showContact, setShowContact] = useState(false); // Track if the contact section is shown
  const [contactVisible, setContactVisible] = useState(false); // For delay in showing contact

  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Define the animated spring for position, scale, and rotation
  const { position, scale, rotation } = useSpring({
    position: activeSection === "work"
      ? [sizes.zoomPosition[0] + 3.2, sizes.zoomPosition[1] + 0.4, sizes.zoomPosition[2] - 0.8]
      : isZoomed
        ? sizes.zoomPosition
        : sizes.deskPosition,
    scale: isZoomed || workZoom ? [2, 2, 2] : sizes.deskScale,
    rotation: isZoomed || workZoom ? [Math.PI / 15, -Math.PI, 0] : [0, -Math.PI, 0],
    config: { mass: 1, tension: 70, friction: 26 },
  });

  // Handle Navbar clicks
  const handleNavClick = (view) => {
    if (view === "work") {
      setIsZoomed(true);
      setShowContact(false);
      setWorkZoom(true); // Trigger zoom for the second monitor (work section)
      setContactVisible(false)
      setActiveSection(view);
    } else if (view === "about") {
      setIsZoomed(true); // Zoom into the main monitor for about
      setWorkZoom(false); // Disable work zoom
      setShowContact(false); // Hide contact section
      setContactVisible(false)
      setActiveSection(view);
    } else if (view === "contact") {
      setIsZoomed(true); // Zoom into the main monitor for contact
      setWorkZoom(false); // Disable work zoom
      setShowContact(true); // Start the process to show the contact section
      setTimeout(() => setContactVisible(true), 1000); // Delay showing contact section after 1 second
      setActiveSection(view);
    } else {
      setIsZoomed(false); // Reset zoom when "Home" is clicked
      setWorkZoom(false); // Reset work zoom
      setShowContact(false); // Hide contact section immediately
      setContactVisible(false); // Hide contact section instantly
      setActiveSection("home"); // Reset to the home section
    }
  };

  const handleZoomOut = () => {
    setIsZoomed(false); // Zoom out when back button is pressed
    setWorkZoom(false); // Reset work zoom
    setShowContact(false); // Hide contact section immediately
    setContactVisible(false); // Hide contact section instantly
    setActiveSection("home"); // Reset to home view
  };

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      {/* Use your existing Navbar and pass the handleNavClick function */}
      <Navbar handleNavClick={handleNavClick} />

      {/* Main Content */}
      <div className={`w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 transition-opacity duration-1000 ${isZoomed ? 'fade-out' : 'fade-in'}`}>
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I'm Max <span className="waving-hand">🤙</span>
        </p>
        <p className="hero_tag text-gray_gradient">Building Dreams into Reality</p>
      </div>

      <div className="w-full h-full absolute inset-0 z-0">
        <Leva />
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <ambientLight intensity={1} />

            {/* Animated HackerRoom model with dynamic texture */}
            <animated.group position={position} scale={scale} rotation={rotation}>
              <HackerRoom activeSection={activeSection} />
            </animated.group>
          </Suspense>
        </Canvas>
      </div>

      {/* Back button when zoomed in */}
      {isZoomed && (
        <button
          onClick={handleZoomOut}
          className="absolute bottom-5 left-5 z-50 bg-white text-black p-2 rounded-lg"
        >
          Back
        </button>
      )}

      {/* Transparent link for "work" section */}
      {activeSection === "work" && (
        <a
          href="https://www.chore-quest.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute z-50" // Seethrough black background for positioning (can be removed later)
          style={{
            top: '27%',
            left: '30%', // Adjust to fit over the second monitor
            width: '320px',
            height: '420px',
          }}
        >
        </a>
      )}

      {/* Contact section on the first monitor */}
      {showContact && (
        <div
          className={`absolute z-50 p-4 rounded-lg text-white transition-opacity duration-1000 ${contactVisible ? 'fade-in-contact' : 'fade-out'}`}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
          }}
        >
          <h2 className="text-center mb-3">Contact Me</h2>
          <div className="flex justify-center">
            <a href="mailto:itsmaximuk@gmail.com" className="text-decoration-none text-white mx-3">
              <i className="fas fa-envelope fa-2x"></i>
            </a>
            <a href="https://www.linkedin.com/in/max-mccain-b39236198/" target="_blank" className="text-decoration-none text-white mx-3">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://github.com/MM-Japan" target="_blank" className="text-decoration-none text-white mx-3">
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="/cv/Web_Developer_CV_Maxim_McCain.pdf" target="_blank" className="text-decoration-none text-white mx-3" download>
              <i className="fa-solid fa-file-arrow-down fa-2x"></i>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
