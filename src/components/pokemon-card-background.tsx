import { memo } from "react";

const CARD_EMOJIS = ["🃏", "⭐", "⚡", "🔥", "💧", "🌿", "🌀", "✨"];

const CARD_POSITIONS = [
  { left: "5%", top: "15%", delay: "0s", duration: "9s", size: "text-4xl", rotate: "-12deg", floatX: "15px", floatY: "-20px" },
  { left: "12%", top: "70%", delay: "1.5s", duration: "11s", size: "text-5xl", rotate: "8deg", floatX: "-12px", floatY: "18px" },
  { left: "20%", top: "35%", delay: "3s", duration: "10s", size: "text-3xl", rotate: "15deg", floatX: "10px", floatY: "-15px" },
  { left: "28%", top: "85%", delay: "0.8s", duration: "12s", size: "text-4xl", rotate: "-8deg", floatX: "-18px", floatY: "12px" },
  { left: "38%", top: "10%", delay: "2.2s", duration: "9.5s", size: "text-5xl", rotate: "10deg", floatX: "14px", floatY: "-22px" },
  { left: "45%", top: "55%", delay: "4s", duration: "11.5s", size: "text-3xl", rotate: "-15deg", floatX: "-10px", floatY: "16px" },
  { left: "55%", top: "25%", delay: "1.2s", duration: "10.5s", size: "text-4xl", rotate: "5deg", floatX: "12px", floatY: "-18px" },
  { left: "65%", top: "75%", delay: "2.8s", duration: "9.8s", size: "text-5xl", rotate: "-10deg", floatX: "-15px", floatY: "20px" },
  { left: "75%", top: "40%", delay: "0.5s", duration: "11.2s", size: "text-3xl", rotate: "18deg", floatX: "16px", floatY: "-14px" },
  { left: "85%", top: "15%", delay: "3.5s", duration: "10.2s", size: "text-4xl", rotate: "-20deg", floatX: "-14px", floatY: "18px" },
  { left: "92%", top: "65%", delay: "1.8s", duration: "12.5s", size: "text-5xl", rotate: "12deg", floatX: "18px", floatY: "-25px" }
];

export const PokemonCardBackground = memo(function PokemonCardBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10" />
      {CARD_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className={`absolute opacity-20 ${pos.size} text-primary`}
          style={{
            left: pos.left,
            top: pos.top,
            transform: `rotate(${pos.rotate})`,
          }}
        >
          {CARD_EMOJIS[i % CARD_EMOJIS.length]}
        </div>
      ))}
    </div>
  );
});
