
import React, { useEffect, useRef } from 'react';
import BillSplitter from '../components/BillSplitter';

/* global UnicornStudio */

const Index = () => {
  const unicornRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Ensure UnicornStudio is loaded and the ref is attached
    if (typeof UnicornStudio !== "undefined" && unicornRef.current) {
      console.log("Adding Unicorn Studio scene to:", unicornRef.current.id);
      UnicornStudio.addScene({
        elementId: unicornRef.current.id,
        projectId: "OYRMKOXzrOe7xOTfMva9",
        scale: 1,
        dpi: 1.5,
        lazyLoad: false,
        altText: "Interactive background animation",
        ariaLabel: "Unicorn Studio background animation",
      })
      .then((scene) => {
        sceneRef.current = scene;
        console.log("Unicorn Studio scene added successfully:", scene);
      })
      .catch((err) => {
        console.error("Failed to add Unicorn Studio scene:", err);
      });
    } else {
      console.log("UnicornStudio debug:", {
        available: typeof UnicornStudio !== "undefined",
        refReady: !!unicornRef.current,
      });
    }

    // Cleanup on component unmount
    return () => {
      if (sceneRef.current?.destroy) {
        console.log("Destroying Unicorn Studio scene");
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Unicorn Studio Animation Background */}
      <div
        id="unicorn-hero-animation"
        ref={unicornRef}
        className="absolute inset-0 w-full h-full"
        style={{
          minHeight: "100vh",
          zIndex: 1,
          backgroundColor: "rgba(255, 237, 213, 0.3)", // Fallback background
        }}
      />

      {/* Main Content Container */}
      <div
        className="relative flex flex-col items-center"
        style={{ zIndex: 100 }}
      >
        <BillSplitter />
        <div className="mt-4 text-white/80 text-sm font-semibold backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
          Enjoying the app? <a href="https://coff.ee/shashikirandevadiga" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300 transition-colors font-bold">Buy me a coffee!</a>
        </div>
      </div>
    </div>
  );
};

export default Index;
