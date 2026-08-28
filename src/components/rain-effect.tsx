import { useEffect, useState } from "react";

interface RainDrop {
  id: number;
  left: number;
  top: number;
  height: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface Fish {
  id: number;
  topPercent: number;
  duration: number;
  delay: number;
  scale: number;
  direction: "ltr" | "rtl";
  variant: "cyan" | "gold" | "coral" | "emerald";
  opacity: number;
}

function FishGraphic({ variant }: { variant: Fish["variant"] }) {
  const colors = {
    cyan: {
      body: "url(#fish-grad-cyan)",
      fin: "oklch(0.78 0.20 230 / 0.85)",
      glow: "oklch(0.70 0.22 240 / 0.6)",
    },
    gold: {
      body: "url(#fish-grad-gold)",
      fin: "oklch(0.85 0.18 85 / 0.85)",
      glow: "oklch(0.80 0.20 75 / 0.6)",
    },
    coral: {
      body: "url(#fish-grad-coral)",
      fin: "oklch(0.75 0.22 30 / 0.85)",
      glow: "oklch(0.70 0.24 25 / 0.6)",
    },
    emerald: {
      body: "url(#fish-grad-emerald)",
      fin: "oklch(0.78 0.18 160 / 0.85)",
      glow: "oklch(0.72 0.20 160 / 0.6)",
    },
  }[variant];

  return (
    <svg
      viewBox="0 0 100 60"
      className="h-full w-full drop-shadow-[0_0_8px_var(--fish-glow)]"
      style={{ ["--fish-glow" as string]: colors.glow }}
    >
      <defs>
        <linearGradient id="fish-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.85 0.15 220)" />
          <stop offset="60%" stopColor="oklch(0.68 0.22 245)" />
          <stop offset="100%" stopColor="oklch(0.45 0.22 260)" />
        </linearGradient>
        <linearGradient id="fish-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.92 0.16 95)" />
          <stop offset="60%" stopColor="oklch(0.78 0.20 70)" />
          <stop offset="100%" stopColor="oklch(0.62 0.22 45)" />
        </linearGradient>
        <linearGradient id="fish-grad-coral" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.88 0.18 45)" />
          <stop offset="60%" stopColor="oklch(0.70 0.24 25)" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 10)" />
        </linearGradient>
        <linearGradient id="fish-grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.88 0.15 150)" />
          <stop offset="60%" stopColor="oklch(0.72 0.20 165)" />
          <stop offset="100%" stopColor="oklch(0.50 0.18 180)" />
        </linearGradient>
      </defs>

      {/* Tail Fin (animated separately) */}
      <g className="fish-tail-fin origin-[68px_30px]">
        <path
          d="M68,30 Q85,12 96,10 Q88,28 95,30 Q88,32 96,50 Q85,48 68,30 Z"
          fill={colors.fin}
          opacity="0.9"
        />
      </g>

      {/* Top Dorsal Fin */}
      <path
        d="M38,18 Q50,4 62,15 Q50,16 38,18 Z"
        fill={colors.fin}
        opacity="0.8"
      />

      {/* Bottom Ventral Fin */}
      <path
        d="M42,42 Q52,54 58,45 Q50,43 42,42 Z"
        fill={colors.fin}
        opacity="0.75"
      />

      {/* Main Fish Body */}
      <path
        d="M12,30 Q30,12 68,30 Q30,48 12,30 Z"
        fill={colors.body}
      />

      {/* Side Fin */}
      <g className="fish-side-fin origin-[38px_32px]">
        <path
          d="M36,30 Q48,34 46,42 Q40,36 36,30 Z"
          fill={colors.fin}
          opacity="0.9"
        />
      </g>

      {/* Cute Fish Eye */}
      <circle cx="24" cy="27" r="3.5" fill="#ffffff" />
      <circle cx="23" cy="27" r="2" fill="#0f172a" />
      <circle cx="22" cy="26" r="0.8" fill="#ffffff" />
    </svg>
  );
}

export function RainEffect() {
  const [drops, setDrops] = useState<RainDrop[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    // Generate rain drops
    const dropCount = 45;
    const generatedDrops: RainDrop[] = Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -(Math.random() * 20),
      height: 18 + Math.random() * 26,
      duration: 0.7 + Math.random() * 0.6,
      delay: Math.random() * 2.5,
      opacity: 0.2 + Math.random() * 0.45,
    }));
    setDrops(generatedDrops);

    // Generate aquarium bubbles
    const bubbleCount = 26;
    const generatedBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      left: 3 + Math.random() * 94,
      size: 4 + Math.random() * 12,
      duration: 3.5 + Math.random() * 4,
      delay: Math.random() * 6,
    }));
    setBubbles(generatedBubbles);

    // Generate swimming fish in underwater layers
    const variants: Fish["variant"][] = ["cyan", "gold", "coral", "emerald"];
    const fishCount = 14;
    const generatedFishes: Fish[] = Array.from({ length: fishCount }, (_, i) => ({
      id: i,
      topPercent: 8 + Math.random() * 78,
      duration: 12 + Math.random() * 14,
      delay: Math.random() * 10,
      scale: 0.55 + Math.random() * 0.6,
      direction: i % 2 === 0 ? "ltr" : "rtl",
      variant: variants[i % variants.length],
      opacity: 0.7 + Math.random() * 0.3,
    }));
    setFishes(generatedFishes);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Falling Rain */}
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="rain-drop absolute"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            height: `${drop.height}px`,
            width: "1.5px",
            opacity: drop.opacity,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {/* Rising Aquarium Water */}
      <div className="water-tank">
        {/* Primary animated wave crest */}
        <svg
          className="water-surface-wave"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 850,-30 1000,50 C1150,130 1200,30 1200,30 L1200,120 L0,120 Z" />
        </svg>

        {/* Secondary wave crest for depth */}
        <svg
          className="water-surface-wave-secondary"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,20 C200,100 400,-20 600,60 C800,140 1000,0 1200,40 L1200,120 L0,120 Z" />
        </svg>

        {/* Shimmering surface waterline glow */}
        <div className="water-surface-glow" />

        {/* Body of water with deep aquatic backdrop and swimming fish */}
        <div className="water-body relative h-full w-full overflow-hidden">
          {/* Ambient caustics lighting */}
          <div className="water-caustics" />

          {/* Swimming Fish school */}
          {fishes.map((fish) => (
            <div
              key={fish.id}
              className={`swimming-fish-lane absolute ${
                fish.direction === "ltr" ? "fish-swim-ltr" : "fish-swim-rtl"
              }`}
              style={{
                top: `${fish.topPercent}%`,
                animationDuration: `${fish.duration}s`,
                animationDelay: `${fish.delay}s`,
                opacity: fish.opacity,
              }}
            >
              <div
                className="fish-undulation w-14 h-9 sm:w-16 sm:h-10"
                style={{
                  transform: `scale(${fish.scale}) ${fish.direction === "rtl" ? "scaleX(-1)" : ""}`,
                }}
              >
                <FishGraphic variant={fish.variant} />
              </div>
            </div>
          ))}

          {/* Bubbles rising within the rising water */}
          {bubbles.map((bubble) => (
            <span
              key={bubble.id}
              className="aquarium-bubble bottom-0"
              style={{
                left: `${bubble.left}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDuration: `${bubble.duration}s`,
                animationDelay: `${bubble.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
