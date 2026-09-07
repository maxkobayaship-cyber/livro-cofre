"use client";

import { cn } from "@/lib/utils";
import { copy } from "@/lib/copy";
import type { SlotFeedback } from "@/lib/game";
import { getKey } from "@/lib/keys";
import { OrnateKey } from "@/components/ornate-key";

type BookSafeProps = {
  status: "playing" | "shaking" | "won" | "lost";
  slots: (number | null)[];
  locked: boolean[];
  feedback: SlotFeedback[] | null;
  focusIndex: number | null;
  secret?: number[];
  onSlotClick: (index: number) => void;
};

function CornerBoss({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("absolute h-10 w-10 sm:h-12 sm:w-12", className)} aria-hidden>
      <path
        d="M4 4h28c2 10-2 18-12 24C10 32 6 24 4 4Z"
        fill="#c9a227"
        stroke="#7a5b12"
        strokeWidth="1.4"
      />
      <circle cx="14" cy="14" r="4" fill="#f3d56a" stroke="#7a5b12" />
    </svg>
  );
}

function CoverOrnaments() {
  return (
    <svg viewBox="0 0 240 320" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect
        x="16"
        y="16"
        width="208"
        height="288"
        rx="8"
        fill="none"
        stroke="#c9a227"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <rect
        x="24"
        y="24"
        width="192"
        height="272"
        rx="6"
        fill="none"
        stroke="#8a6a1c"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M70 78h100M80 86h80"
        stroke="#c9a227"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <path
        d="M120 58c18 8 28 20 28 34s-10 26-28 34c-18-8-28-20-28-34s10-26 28-34Z"
        fill="none"
        stroke="#e8c547"
        strokeWidth="1.4"
        opacity="0.8"
      />
      <circle cx="120" cy="92" r="7" fill="#1a120c" stroke="#e8c547" strokeWidth="1.4" />
      <path
        d="M120 86v12M114 92h12"
        stroke="#e8c547"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function WinManuscript() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
      <p className="font-heading text-[11px] tracking-[0.35em] text-[#8a6a1c] uppercase">
        Folha revelada
      </p>
      <p className="mt-4 font-heading text-lg leading-snug text-[#3a2414] sm:text-xl">
        {copy.winVerse}
      </p>
    </div>
  );
}

function Chains() {
  return (
    <svg
      viewBox="0 0 280 380"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden
    >
      <g stroke="#2a2a30" strokeWidth="7" fill="none" opacity="0.92">
        <path d="M40 20c40 90 20 180 8 340" />
        <path d="M240 16c-36 86-10 190 10 344" />
        <path d="M20 140h240" />
        <path d="M28 230h224" />
      </g>
      <g fill="#3a3a42" stroke="#1a1a1e" strokeWidth="1.5">
        {[50, 110, 170, 240, 310].map((y) => (
          <ellipse key={y} cx="48" cy={y} rx="11" ry="16" />
        ))}
        {[46, 108, 176, 248, 318].map((y) => (
          <ellipse key={y} cx="236" cy={y} rx="11" ry="16" />
        ))}
      </g>
      <rect x="108" y="200" width="64" height="52" rx="6" fill="#1c1c22" stroke="#0a0a0c" />
      <circle cx="140" cy="226" r="10" fill="none" stroke="#6a6a76" strokeWidth="3" />
      <rect x="137" y="226" width="6" height="16" fill="#6a6a76" />
    </svg>
  );
}

export function BookSafe({
  status,
  slots,
  locked,
  feedback,
  focusIndex,
  secret,
  onSlotClick,
}: BookSafeProps) {
  const open = status === "won";
  const sealed = status === "lost";

  return (
    <div className="book-scene mx-auto">
      <div
        className={cn(
          "book",
          open && "is-open",
          sealed && "is-sealed",
          status === "shaking" && "is-shaking",
        )}
        data-testid="book-safe"
        data-secret={secret && secret.length ? secret.join(",") : undefined}
        data-status={status === "shaking" ? "playing" : status}
      >
        <div className="book-back" />
        <div className="book-spine" />
        <div className="book-pages">
          {open ? <WinManuscript /> : <div className="page-lines" />}
        </div>
        <div className="book-cover">
          <div className="cover-leather">
            <CoverOrnaments />
            <CornerBoss className="top-1 left-1 origin-top-left" />
            <CornerBoss className="top-1 right-1 origin-top-right scale-x-[-1]" />
            <CornerBoss className="bottom-1 left-1 origin-bottom-left scale-y-[-1]" />
            <CornerBoss className="right-1 bottom-1 origin-bottom-right scale-[-1]" />

            <div className="relative z-10 flex h-full flex-col items-center px-5 pt-16 pb-4 sm:pt-20">
              <p className="font-heading text-[10px] tracking-[0.42em] text-[#e8c547]/80 uppercase">
                Volume selado
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[0.18em] text-[#f3d56a] uppercase sm:text-3xl">
                Livro
              </h2>
              <h3 className="font-heading text-xl tracking-[0.32em] text-[#e8c547] uppercase sm:text-2xl">
                Cofre
              </h3>

              <div className="lock-plate mt-auto w-full">
                <p className="mb-2 text-center font-heading text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
                  Quatro fechos
                </p>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {slots.map((keyId, index) => {
                    const tone = feedback?.[index];
                    const isFocus = focusIndex === index;
                    const isLocked = locked[index];
                    const keyDef = keyId != null ? getKey(keyId) : null;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={open || sealed || isLocked}
                        onClick={() => onSlotClick(index)}
                        aria-label={copy.slotLabel(index + 1)}
                        data-testid={`lock-slot-${index}`}
                        data-feedback={tone ?? "empty"}
                        className={cn(
                          "lock-slot relative flex h-[4.4rem] items-center justify-center rounded-md border sm:h-20",
                          "bg-[#140e0a]/80 transition-shadow",
                          !tone && "border-[#8a6a1c]",
                          tone === "correct" && "border-[#e8c547] shadow-[0_0_12px_rgba(232,197,71,0.55)]",
                          tone === "present" && "border-[#d9853b] shadow-[0_0_10px_rgba(217,133,59,0.4)]",
                          tone === "absent" && "border-[#5a5348]",
                          isFocus && !isLocked && "ring-2 ring-[#f3d56a] ring-offset-2 ring-offset-[#2a1a12]",
                          isLocked && "cursor-default",
                        )}
                      >
                        {keyDef ? (
                          <OrnateKey
                            keyDef={keyDef}
                            orientation="horizontal"
                            locked={isLocked}
                          />
                        ) : (
                          <span className="keyhole" />
                        )}
                        {isLocked ? (
                          <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-[#e8c547]" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {sealed ? <Chains /> : null}
      </div>
    </div>
  );
}
