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

export function RainEffect() {
  const [drops, setDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const dropCount = 45;
    const generatedDrops: RainDrop[] = Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -(Math.random() * 20),
      height: 15 + Math.random() * 25,
      duration: 0.8 + Math.random() * 0.7,
      delay: Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.35,
    }));
    setDrops(generatedDrops);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
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
    </div>
  );
}
