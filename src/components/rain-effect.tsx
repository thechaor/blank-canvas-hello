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

export function RainEffect() {
  const [drops, setDrops] = useState<RainDrop[]>([]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate rain drops
    const dropCount = 50;
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
    const bubbleCount = 28;
    const generatedBubbles: Bubble[] = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      left: 3 + Math.random() * 94,
      size: 4 + Math.random() * 12,
      duration: 3.5 + Math.random() * 4,
      delay: Math.random() * 6,
    }));
    setBubbles(generatedBubbles);
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

        {/* Body of water with deep aquatic backdrop */}
        <div className="water-body relative h-full w-full">
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
