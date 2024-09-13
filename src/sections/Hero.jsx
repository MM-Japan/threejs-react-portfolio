import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Html } from '@react-three/drei';
import HackerRoom from "../components/HackerRoom";
import { Suspense, useState } from "react";
import CanvasLoader from "../components/CanvasLoader";
import { Leva } from 'leva';
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import { useSpring, animated } from '@react-spring/three';
import Navbar from "./Navbar"; // Import your existing Navbar

const Hero = () => {
  const [isZoomed, setIsZoomed] = useState(false); // Track if the model is zoomed
  const [activeSection, setActiveSection] = useState("home"); // Track the active section for texture

  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Define the animated spring for position, scale, and rotation
  const { position, scale, rotation } = useSpring({
    position: isZoomed ? sizes.zoomPosition : sizes.deskPosition,
    scale: isZoomed ? [2, 2, 2] : sizes.deskScale,
    rotation: isZoomed ? [Math.PI / 15, -Math.PI, 0] : [0, -Math.PI, 0],
    config: { mass: 1, tension: 70, friction: 26 },
  });

  // Handle Navbar clicks
  const handleNavClick = (view) => {
    if (view === "about" || view === "work" || view === "contact") {
      setIsZoomed(true); // Trigger zoom animation when any of the sections is clicked
      setActiveSection(view); // Set the active section
    } else {
      setIsZoomed(false); // Reset zoom when other links (e.g., "Home") are clicked
      setActiveSection("home"); // Reset to the home section
    }
  };

  const handleZoomOut = () => {
    setIsZoomed(false); // Zoom out when back button is pressed
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
    </section>
  );
};

export default Hero;
