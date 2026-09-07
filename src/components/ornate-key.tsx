import { useId } from "react";
import { cn } from "@/lib/utils";
import type { KeyDef, KeySymbol } from "@/lib/keys";

type OrnateKeyProps = {
  keyDef: KeyDef;
  className?: string;
  orientation?: "vertical" | "horizontal";
  dimmed?: boolean;
  selected?: boolean;
  locked?: boolean;
  label?: boolean;
};

function SymbolMark({
  symbol,
  color,
  glow,
}: {
  symbol: KeySymbol;
  color: string;
  glow: string;
}) {
  const common = {
    fill: glow,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinejoin: "round" as const,
  };

  switch (symbol) {
    case "star":
      return (
        <polygon
          points="40,22 43.2,31.2 53,31.6 45.4,37.4 48.2,47 40,41.6 31.8,47 34.6,37.4 27,31.6 36.8,31.2"
          {...common}
        />
      );
    case "moon":
      return (
        <path
          d="M46 26c-6 1.4-10 7-9.2 13.4C37.6 46 43 50.4 49 50.2 44 52.8 37 50 34.2 43.4 31.2 36.2 34 27.6 41 24.6c1.6-.6 3.4-.8 5-.4-.2.6-.4 1.2-.4 1.8Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
        />
      );
    case "sun":
      return (
        <g>
          <circle cx="40" cy="36" r="7" fill={glow} stroke={color} strokeWidth={1.5} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 40 + Math.cos(rad) * 10;
            const y1 = 36 + Math.sin(rad) * 10;
            const x2 = 40 + Math.cos(rad) * 14.5;
            const y2 = 36 + Math.sin(rad) * 14.5;
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      );
    case "leaf":
      return (
        <path
          d="M40 22c10 8 14 16 12 24-6 2-12 2-16 8-2-10 0-20 4-32Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
        />
      );
    case "flame":
      return (
        <path
          d="M40 50c8-6 10-16 4-24 2 6-2 8-2 12-6-8-4-16 2-22-10 6-16 16-12 26 2 6 6 10 8 8Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
        />
      );
    case "drop":
      return (
        <path
          d="M40 22c8 12 12 18 12 24a12 12 0 0 1-24 0c0-6 4-12 12-24Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
        />
      );
    case "eye":
      return (
        <g>
          <path
            d="M26 36c6-8 22-8 28 0-6 8-22 8-28 0Z"
            fill={glow}
            stroke={color}
            strokeWidth={1.5}
          />
          <circle cx="40" cy="36" r="4.2" fill={color} />
        </g>
      );
    case "crown":
      return (
        <path
          d="M28 44h24l-2-14-6 6-4-10-4 10-6-6-2 14Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      );
    case "skull":
      return (
        <g>
          <ellipse cx="40" cy="34" rx="10" ry="9" fill={glow} stroke={color} strokeWidth={1.5} />
          <circle cx="36" cy="33" r="2.2" fill={color} />
          <circle cx="44" cy="33" r="2.2" fill={color} />
          <path d="M37 40h6" stroke={color} strokeWidth={1.4} />
        </g>
      );
    case "heart":
      return (
        <path
          d="M40 48c8-6 14-12 14-18 0-4-3-7-7-7-3 0-5 2-7 5-2-3-4-5-7-5-4 0-7 3-7 7 0 6 6 12 14 18Z"
          fill={glow}
          stroke={color}
          strokeWidth={1.5}
        />
      );
  }
}

function bitPath(id: number) {
  const patterns: Record<number, string> = {
    1: "M46 150h10v8H50v6h8v8H46z",
    2: "M46 150h12v6H52v5h8v7H50v6h8v8H46z",
    3: "M46 148h8v7h6v7H50v8h10v8H46z",
    4: "M46 150h14v6H52v10h8v6H46z",
    5: "M46 148h10v5H50v6h10v6H52v6h8v7H46z",
    6: "M46 150h12v8H50v4h10v8H46v-6h6v-6H46z",
    7: "M46 147h8v6h8v6H52v6h8v8H46z",
    8: "M46 150h14v5H54v5h6v6H50v5h10v7H46z",
    9: "M46 148h6v8h8v6H50v8h10v8H46z",
    10: "M46 150h12v6H50v8h10v6H52v6h8v6H46z",
  };
  return patterns[id] ?? patterns[1];
}

export function OrnateKey({
  keyDef,
  className,
  orientation = "vertical",
  dimmed,
  selected,
  locked,
  label = false,
}: OrnateKeyProps) {
  const { color, glow, dark, name, epithet, symbol, id } = keyDef;
  const uid = useId().replace(/:/g, "");
  const metalId = `metal-${id}-${uid}`;

  return (
    <span
      className={cn(
        "inline-flex flex-col items-center gap-1 transition-all",
        dimmed && "opacity-40 grayscale-[0.4]",
        selected && "drop-shadow-[0_0_10px_rgba(232,197,71,0.55)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 80 200"
        className={cn(
          "h-auto w-9 sm:w-11",
          orientation === "horizontal" && "h-7 w-16 rotate-90 sm:h-8 sm:w-[4.5rem]",
          locked && "drop-shadow-[0_0_8px_rgba(232,197,71,0.8)]",
        )}
        aria-hidden
      >
        <defs>
          <linearGradient id={metalId} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={glow} />
            <stop offset="45%" stopColor={color} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
        </defs>
        <rect
          x="37"
          y="54"
          width="6"
          height="100"
          rx="2"
          fill={`url(#${metalId})`}
          stroke={dark}
          strokeWidth="1"
        />
        <circle
          cx="40"
          cy="36"
          r="20"
          fill={`url(#${metalId})`}
          stroke={dark}
          strokeWidth="2.2"
        />
        <circle cx="40" cy="36" r="13.5" fill="#1a120c" stroke={color} strokeWidth="1.2" />
        <SymbolMark symbol={symbol} color={color} glow={glow} />
        <path d={bitPath(id)} fill={`url(#${metalId})`} stroke={dark} strokeWidth="1" />
        <rect x="35" y="58" width="10" height="5" rx="1" fill={glow} opacity="0.5" />
      </svg>
      {label ? (
        <span className="max-w-16 text-center leading-tight">
          <span className="block font-heading text-[11px] font-semibold tracking-wide text-[color:var(--parchment)] sm:text-xs">
            {id} {name}
          </span>
          <span className="block text-[10px] text-[color:var(--gold-dim)]">{epithet}</span>
        </span>
      ) : null}
    </span>
  );
}
