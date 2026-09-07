import { cn } from "@/lib/utils";
import { MAX_ATTEMPTS } from "@/lib/game";
import { copy } from "@/lib/copy";

export function ChanceSeals({ remaining }: { remaining: number }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      aria-label={`${copy.chancesLabel}: ${remaining} de ${MAX_ATTEMPTS}`}
    >
      <p className="font-heading text-[11px] tracking-[0.28em] text-[color:var(--gold-dim)] uppercase">
        {copy.chancesLabel}
      </p>
      <div className="flex items-end gap-3">
        {Array.from({ length: MAX_ATTEMPTS }, (_, index) => {
          const alive = index < remaining;
          return (
            <span
              key={index}
              data-testid={`chance-${index}`}
              data-alive={alive}
              className={cn(
                "relative flex h-11 w-9 items-center justify-center",
                !alive && "opacity-50",
              )}
            >
              <svg viewBox="0 0 36 44" className="h-11 w-9" aria-hidden>
                <path
                  d="M8 14c0-6 4.5-11 10-11s10 5 10 11c6 2 8 7 6 12-3 8-8 14-16 16-8-2-13-8-16-16-2-5 0-10 6-12Z"
                  fill={alive ? "#8f1f24" : "#3a3530"}
                  stroke={alive ? "#e8c547" : "#6a645c"}
                  strokeWidth="1.3"
                />
                <path
                  d="M18 8c4 3 6 7 5 12"
                  fill="none"
                  stroke={alive ? "#f3d56a" : "#7a746c"}
                  strokeWidth="1"
                />
                {alive ? (
                  <circle cx="18" cy="22" r="4" fill="#1a120c" stroke="#e8c547" />
                ) : (
                  <path d="M12 16l12 14M24 16L12 30" stroke="#8a8378" strokeWidth="1.4" />
                )}
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
}
