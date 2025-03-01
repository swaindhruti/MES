"use client";
import { useEffect } from "react";
import { About } from "./AboutSection/aboutUsSection";
import { Hero } from "./HeroSection/heroSection";
import { Event } from "./EventSection/Event";
import { Gallery } from "./GallerySection/Gallery";

export const LandingPage = () => {
  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector(".star-container");
      if (!container) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-twinkle";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

  return (
    <div className="h-auto p-[16px] relative flex flex-col gap-32">
      {/* Star Container: Fixed and covers full screen */}
      <div className="star-container fixed inset-0 overflow-hidden">
        {/* Stars generated dynamically */}
      </div>

      {/* Background grid effect */}
      <div
        className="absolute inset-0 bg-[size:50px_50px] opacity-10 [mask-image:linear-gradient(transparent_70%,_black)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        }}
      />

      {/* Hero and About sections */}
      <Hero />
      <About />
      <Event />
      <Gallery />
    </div>
  );
};
