"use client";

import { useEffect, useState } from "react";

export default function ChocolateAnimation() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 8);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  const foilClip = [
    "inset(0 0 0 0)",
    "inset(0 0 0 5%)",
    "inset(0 0 0 18%)",
    "inset(0 0 0 35%)",
    "inset(0 0 0 55%)",
    "inset(0 0 0 75%)",
    "inset(0 0 0 92%)",
    "inset(0 0 0 100%)",
  ];

  const foilRotation = [0, -1, -3, -6, -10, -16, -24, -35];
  const foilOpacity = [1, 1, 0.95, 0.9, 0.8, 0.6, 0.3, 0];

  return (
    <div className="relative w-36 h-16 mx-auto" aria-hidden="true">
      {/* Chocolate bar underneath */}
      <div className="absolute inset-0 rounded-sm overflow-hidden" style={{ background: "var(--warm)" }}>
        <div className="w-full h-full grid grid-cols-4 grid-rows-2 gap-[1px] p-[5px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ background: "var(--warm-light)", opacity: 0.4 }}
            />
          ))}
        </div>
      </div>

      {/* Foil wrapper */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 40%, var(--accent) 60%, var(--accent-light) 100%)`,
          clipPath: foilClip[frame],
          transform: `rotate(${foilRotation[frame]}deg)`,
          opacity: foilOpacity[frame],
          transformOrigin: "right center",
          transition: "none",
        }}
      >
        <div className="absolute inset-0 opacity-15">
          {[20, 40, 60, 80].map((left) => (
            <div
              key={left}
              className="absolute top-0 bottom-0 w-[0.5px]"
              style={{ left: `${left}%`, background: "var(--foreground)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
