import { memo } from "react";

const CARD_EMOJIS = ["🃏", "⭐", "⚡", "🔥", "💧", "🌿", "🌀", "✨"];

const CARD_POSITIONS = [
  { left: "5%", top: "15%", delay: "0s", duration: "9s", size: "text-4xl", rotate: "-12deg", floatX: "15px", floatY: "-20px" },
  { left: "12%", top: "70%", delay: "1.5s", duration: "11s", size: "text-5xl", rotate: "8deg", floatX: "-12px", floatY: "18px" },
  { left: "20%", top: "35%", delay: "3s", duration: "10s", size: "text-3xl", rotate: "15deg", floatX: "10px", floatY: "-15px" },
  { left: "28%", top: "85%", delay: "0.8s", duration: "12s", size: "text-4xl", rotate: "-8deg", floatX: "-18px", floatY: "12px" },
  { left: "38%", top: "10%", delay: "2.2s", duration: "9.5s", size: "text-5xl", rotate: "10deg", floatX: "14px", floatY: "-22px" },
  { left: "45%", top: "55%", delay: "4s", duration: "11.5s", size: "text-3xl", rotate: "-15deg", floatX: "-10px", floatY: "16px" },
  { left: "55%", top: "25%", delay: "1s", duration: "10.5s", size: "text-4xl", rotate: "6deg", floatX: "16px", floatY: "-18px" },
  { left: "62%", top: "80%", delay: "3.5s", duration: "9s", size: "text-5xl", rotate: "-10deg", floatX: "-14px", floatY: "14px" },
  { left: "70%", top: "45%", delay: "0.5s", duration: "12.5s", size: "text-3xl", rotate: "12deg", floatX: "12px", floatY: "-16px" },
  { left: "78%", top: "15%", delay: "2.8s", duration: "10s", size: "text-4xl", rotate: "-6deg", floatX: "-16px", floatY: "20px" },
  { left: "85%", top: "65%", delay: "1.8s", duration: "11s", size: "text-5xl", rotate: "9deg", floatX: "10px", floatY: "-14px" },
  { left: "92%", top: "30%", delay: "4.5s", duration: "9.8s", size: "text-3xl", rotate: "-14deg", floatX: "-12px", floatY: "18px" },
];

function PokemonCardBackground() {
  return (
    <div className="pokemon-card-bg" aria-hidden="true">
      {CARD_POSITIONS.map((card, index) => (
        <span
          key={index}
          className={`pokemon-card-float ${card.size}`}
          style={{
            left: card.left,
            top: card.top,
            animationDelay: card.delay,
            animationDuration: card.duration,
            transform: `rotate(${card.rotate})`,
            "--card-float-x": card.floatX,
            "--card-float-y": card.floatY,
          } as React.CSSProperties}
        >
          {CARD_EMOJIS[index % CARD_EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}

export default memo(PokemonCardBackground);
