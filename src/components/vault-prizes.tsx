import { cn } from "@/lib/utils";
import { PRIZES, type PrizeId } from "@/lib/prizes";
import { copy } from "@/lib/copy";

function PrizeIcon({ id, revealed }: { id: PrizeId; revealed: boolean }) {
  const stroke = revealed ? "#8a6a1c" : "#6a5a40";
  const fill = revealed ? "#f4ead8" : "#cbb89a";

  switch (id) {
    case "dinheiro":
      return (
        <svg viewBox="0 0 72 56" className="h-10 w-12" aria-hidden>
          <rect x="8" y="18" width="48" height="26" rx="3" fill={revealed ? "#2f8f5b" : fill} stroke={stroke} />
          <rect x="14" y="12" width="48" height="26" rx="3" fill={revealed ? "#3eaa6e" : fill} stroke={stroke} />
          <circle cx="38" cy="25" r="6" fill={revealed ? "#f3d56a" : "#d4c4a0"} stroke={stroke} />
          <text x="38" y="28" textAnchor="middle" fontSize="8" fill={stroke}>
            $
          </text>
          <ellipse cx="18" cy="44" rx="6" ry="5" fill={revealed ? "#e8c547" : fill} stroke={stroke} />
          <ellipse cx="28" cy="46" rx="6" ry="5" fill={revealed ? "#c9a227" : fill} stroke={stroke} />
        </svg>
      );
    case "tablet":
      return (
        <svg viewBox="0 0 72 56" className="h-10 w-12" aria-hidden>
          <rect x="16" y="4" width="40" height="48" rx="5" fill={revealed ? "#1c1c22" : fill} stroke={stroke} />
          <rect x="20" y="9" width="32" height="36" rx="2" fill={revealed ? "#7eb3ff" : "#d8cbb4"} />
          <circle cx="36" cy="49" r="2" fill={revealed ? "#e8c547" : stroke} />
        </svg>
      );
    case "iphone":
      return (
        <svg viewBox="0 0 72 56" className="h-10 w-12" aria-hidden>
          <rect x="22" y="2" width="28" height="52" rx="6" fill={revealed ? "#1c1c22" : fill} stroke={stroke} />
          <rect x="25" y="8" width="22" height="38" rx="2" fill={revealed ? "#8ec5ff" : "#d8cbb4"} />
          <rect x="30" y="4" width="12" height="3" rx="1.5" fill={revealed ? "#2a2a30" : stroke} />
          <rect x="32" y="48" width="8" height="2" rx="1" fill={revealed ? "#e8c547" : stroke} />
        </svg>
      );
    case "macbook":
      return (
        <svg viewBox="0 0 72 56" className="h-10 w-12" aria-hidden>
          <rect x="12" y="8" width="48" height="30" rx="3" fill={revealed ? "#c9d4e0" : fill} stroke={stroke} />
          <rect x="16" y="12" width="40" height="22" fill={revealed ? "#1a3048" : "#d8cbb4"} />
          <path d="M8 40h56l-4 8H12z" fill={revealed ? "#a8b4c0" : fill} stroke={stroke} />
          <rect x="30" y="42" width="12" height="3" rx="1" fill={revealed ? "#6a6a76" : stroke} />
        </svg>
      );
    case "airpods":
      return (
        <svg viewBox="0 0 72 56" className="h-10 w-12" aria-hidden>
          <rect x="20" y="22" width="32" height="26" rx="8" fill={revealed ? "#f4ead8" : fill} stroke={stroke} />
          <rect x="28" y="34" width="16" height="8" rx="3" fill={revealed ? "#e8c547" : "#d4c4a0"} />
          <path
            d="M24 18c0-8 6-14 12-14s8 4 8 8"
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
          />
          <path
            d="M48 18c0-8-6-14-12-8"
            fill="none"
            stroke={stroke}
            strokeWidth="2.2"
          />
          <circle cx="26" cy="16" r="4" fill={revealed ? "#fff6ea" : fill} stroke={stroke} />
          <circle cx="46" cy="16" r="4" fill={revealed ? "#fff6ea" : fill} stroke={stroke} />
        </svg>
      );
  }
}

export function VaultPrizes({
  revealed,
  className,
}: {
  revealed: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("flex h-full flex-col items-center justify-center px-3 py-4", className)}
      data-testid="vault-prizes"
      data-revealed={revealed}
    >
      <p
        className={cn(
          "font-heading text-[10px] tracking-[0.28em] uppercase",
          revealed ? "text-[#8a6a1c]" : "text-[#8a8378]/70",
        )}
      >
        {revealed ? copy.treasureRevealed : copy.treasureHidden}
      </p>
      <ul className="mt-2 grid w-full grid-cols-3 gap-1.5">
        {PRIZES.map((prize) => (
          <li
            key={prize.id}
            className={cn(
              "flex flex-col items-center rounded-md border px-1 py-2",
              revealed
                ? "border-[#c9a227]/50 bg-[#fff8ea]/80 shadow-[0_0_12px_rgba(232,197,71,0.35)]"
                : "border-[#8a6a1c]/20 bg-[#1a120c]/20 opacity-40",
            )}
          >
            <PrizeIcon id={prize.id} revealed={revealed} />
            <span
              className={cn(
                "mt-1 font-heading text-[10px] tracking-wide",
                revealed ? "text-[#3a2414]" : "text-[#6a5a40]",
              )}
            >
              {prize.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PrizeShowcase() {
  return (
    <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5" data-testid="prize-showcase">
      {PRIZES.map((prize) => (
        <li
          key={prize.id}
          className="flex flex-col items-center rounded-lg border border-[#c9a227]/40 bg-[#1a120c]/70 px-2 py-2"
        >
          <PrizeIcon id={prize.id} revealed />
          <span className="mt-1 font-heading text-[11px] text-[#e8c547]">{prize.name}</span>
        </li>
      ))}
    </ul>
  );
}
