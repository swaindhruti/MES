"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ReactConfetti from "react-confetti";

const IMAGES = [
  {
    src: "https://res.cloudinary.com/dbnfkkfov/image/upload/v1771781126/uh9oyekafo5ixpzjmty9.png",
    alt: "MINARE Gallery Image 1",
  },
  {
    src: "https://res.cloudinary.com/dbnfkkfov/image/upload/v1771781124/er2ee3arhplhwc0f60i0.png",
    alt: "MINARE Gallery Image 2",
  },
  {
    src: "https://res.cloudinary.com/dbnfkkfov/image/upload/v1771781126/tjhpt2hyoi14ecbpbmuv.png",
    alt: "MINARE Gallery Image 3",
  },
  {
    src: "https://res.cloudinary.com/dbnfkkfov/image/upload/v1771781125/p9tpolgl9exrpt89y3ul.png",
    alt: "MINARE Gallery Image 4",
  },
];

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfAtyFK35TRWt76ZsXP6uyl6fn-l34olHVoj1FqdDL6eQ14lA/viewform?usp=sharing&ouid=102508462596128705218";

const AUTO_ADVANCE_DELAY = 3500;
const CONFETTI_DURATION = 5000;

export const WelcomeCarouselModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Always show on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setIsOpen(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setVisible(true);
          setShowConfetti(true);
        })
      );
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
    return () => clearTimeout(t);
  }, [showConfetti]);

  const close = useCallback(() => {
    setVisible(false);
    setShowConfetti(false);
    setTimeout(() => setIsOpen(false), 350);
  }, []);

  const handleExplore = useCallback(() => {
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
    close();
  }, [close]);

  const next = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % IMAGES.length),
    []
  );
  const prev = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length),
    []
  );
  const goTo = useCallback(
    (index: number) => setCurrentIndex((index + IMAGES.length) % IMAGES.length),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    timerRef.current = setInterval(next, AUTO_ADVANCE_DELAY);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, next]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        padding: "clamp(12px, 3vh, 32px)",
        backgroundColor: visible ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        transition: "background-color 0.35s ease, backdrop-filter 0.35s ease",
      }}
      onClick={close}
    >
      {/* Confetti */}
      {showConfetti && windowSize.width > 0 && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={350}
          colors={["#ffffff", "#c0c0c0", "#a8a8a8", "#d4af37", "#888"]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: "none",
          }}
        />
      )}

      {/*
        Modal card:
        - Uses flex-col so header/footer are fixed height and the carousel gets all remaining space
        - Height is capped at 95vh so it never escapes the screen
        - Width is capped at 92vw / 920px
      */}
      <div
        className="relative flex flex-col w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth: "min(1000px, 92vw)",
          height: "min(92vh, 1000px)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0 0 80px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.75)",
          transform: visible
            ? "scale(1) translateY(0px)"
            : "scale(0.9) translateY(28px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header (fixed height) ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5"
          style={{ height: "52px" }}
        >
          <h2
            className="font-orbitron text-sm sm:text-base font-bold tracking-widest"
            style={{
              background: "linear-gradient(90deg, #e5e7eb, #ffffff, #9ca3af)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MINARE&apos;26
          </h2>
          <button
            onClick={close}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.45)";
            }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Carousel (flex-1 = fills ALL remaining vertical space) ── */}
        <div
          className="relative flex-1 overflow-hidden select-none bg-black/30"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Sliding strip */}
          <div
            className="flex h-full"
            style={{
              width: `${IMAGES.length * 100}%`,
              transform: `translateX(-${
                (currentIndex * 100) / IMAGES.length
              }%)`,
              transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative h-full flex-shrink-0"
                style={{ width: `${100 / IMAGES.length}%` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 768px) 92vw, 920px"
                />
                {/* edge vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.4) 100%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,0,0,0.8)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,0,0,0.55)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.7)";
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,0,0,0.8)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(0,0,0,0.55)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.7)";
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ── Hover overlay: haze + centered Buy Now ── */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0)",
              backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
              transition:
                "background-color 0.3s ease, backdrop-filter 0.3s ease",
            }}
          >
            <button
              className="pointer-events-auto font-orbitron text-sm sm:text-base font-semibold tracking-widest uppercase px-8 py-3 rounded-xl transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered
                  ? "scale(1) translateY(0)"
                  : "scale(0.9) translateY(8px)",
                transition:
                  "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                boxShadow: isHovered
                  ? "0 0 30px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "none",
              }}
              onClick={handleExplore}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* ── Footer (fixed height) ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5"
          style={{ height: "52px" }}
        >
          {/* Dots */}
          <div className="flex items-center gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
                    height: "8px",
                    backgroundColor:
                      i === currentIndex ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Register CTA */}
          <button
            onClick={handleExplore}
            className="font-lato text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200"
            style={{ color: "rgba(255,255,255,1)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.55)")
            }
          >
            Buy Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
