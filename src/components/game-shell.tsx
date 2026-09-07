"use client";

import { useEffect, useMemo, useState } from "react";
import { BookSafe } from "@/components/book-safe";
import { ChanceSeals } from "@/components/chance-seals";
import { HowToPlay } from "@/components/how-to-play";
import { PrizeShowcase } from "@/components/vault-prizes";
import { OrnateKey } from "@/components/ornate-key";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import {
  CODE_LENGTH,
  MAX_ATTEMPTS,
  evaluateGuess,
  isWinningAttempt,
  lockedSlotsFromAttempts,
  type Attempt,
  type GameStatus,
} from "@/lib/game";
import { KEYS, getKey } from "@/lib/keys";
import { useGameSecret } from "@/lib/use-game-secret";
import { cn } from "@/lib/utils";

function emptySlots(): (number | null)[] {
  return Array.from({ length: CODE_LENGTH }, () => null);
}

function formatSecret(ids: number[]) {
  return ids.map((id) => getKey(id).name).join(" · ");
}

export function GameShell() {
  const { secret, resetSecret, ready } = useGameSecret();
  const [slots, setSlots] = useState<(number | null)[]>(emptySlots);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [shaking, setShaking] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const locked = useMemo(() => lockedSlotsFromAttempts(attempts), [attempts]);
  const lastAttempt = attempts.at(-1) ?? null;
  const remaining = MAX_ATTEMPTS - attempts.length;
  const filledCount = slots.filter((slot) => slot != null).length;
  const missing = CODE_LENGTH - filledCount;

  const lastGuessMatches =
    lastAttempt != null &&
    slots.every((slot, index) => slot === lastAttempt.guess[index]);

  const canSubmit =
    status === "playing" &&
    !shaking &&
    ready &&
    missing === 0 &&
    !lastGuessMatches;

  function startNewVolume() {
    resetSecret();
    setSlots(emptySlots());
    setAttempts([]);
    setStatus("playing");
    setShaking(false);
    setFocusIndex(null);
  }

  function insertKey(id: number) {
    if (status !== "playing" || shaking) return;
    if (slots.includes(id)) return;

    setSlots((current) => {
      const next = [...current];
      const target =
        focusIndex != null && next[focusIndex] == null && !locked[focusIndex]
          ? focusIndex
          : next.findIndex((slot, index) => slot == null && !locked[index]);

      if (target === -1) return current;
      next[target] = id;
      return next;
    });
    setFocusIndex(null);
  }

  function handleSlotClick(index: number) {
    if (status !== "playing" || shaking || locked[index]) return;

    if (slots[index] != null) {
      setSlots((current) => {
        const next = [...current];
        next[index] = null;
        return next;
      });
      setFocusIndex(null);
      return;
    }

    setFocusIndex((current) => (current === index ? null : index));
  }

  function clearUnlocked() {
    if (status !== "playing" || shaking) return;
    setSlots((current) => current.map((slot, index) => (locked[index] ? slot : null)));
    setFocusIndex(null);
  }

  function submitAttempt() {
    if (!canSubmit) return;
    const guess = slots.map((slot) => slot as number);
    const attempt = evaluateGuess(secret, guess);
    const nextAttempts = [...attempts, attempt];
    setAttempts(nextAttempts);

    if (isWinningAttempt(attempt)) {
      setStatus("won");
      return;
    }

    if (nextAttempts.length >= MAX_ATTEMPTS) {
      setStatus("lost");
      return;
    }

    setShaking(true);
    window.setTimeout(() => setShaking(false), 650);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (status !== "playing") return;
      if (event.key >= "1" && event.key <= "9") {
        insertKey(Number(event.key));
      }
      if (event.key === "0") insertKey(10);
      if (event.key === "Enter") submitAttempt();
      if (event.key === "Backspace") {
        const lastFilled = [...slots]
          .map((slot, index) => ({ slot, index }))
          .reverse()
          .find((entry) => entry.slot != null && !locked[entry.index]);
        if (lastFilled) {
          setSlots((current) => {
            const next = [...current];
            next[lastFilled.index] = null;
            return next;
          });
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- insert/submit close over latest slots
  }, [status, slots, locked, canSubmit, secret]);

  const bookStatus = shaking ? "shaking" : status;
  const liveMessage =
    status === "won"
      ? copy.winTitle
      : status === "lost"
        ? copy.loseTitle
        : lastAttempt
          ? copy.feedback(lastAttempt.correctPositions, lastAttempt.presentCount)
          : copy.pickPrompt;

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="atmosphere" aria-hidden />
      <header className="relative z-10 flex items-start justify-between gap-3 px-4 pt-5 sm:px-8">
        <div>
          <p className="font-heading text-[11px] tracking-[0.38em] text-[color:var(--gold-dim)] uppercase">
            {copy.tagline}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-[0.12em] text-[color:var(--gold)] uppercase sm:text-4xl">
            {copy.title}
          </h1>
        </div>
        <HowToPlay />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-8 lg:flex-row lg:items-start lg:gap-10">
        <section className="flex flex-1 flex-col items-center gap-4">
          <ChanceSeals remaining={remaining} />
          <p className="max-w-sm text-center text-sm text-[color:var(--parchment-dim)] sm:text-base">
            {copy.chanceLeft[remaining] ?? copy.pickPrompt}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-[color:var(--parchment-dim)]">
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#e8c547]" />
              lugar certo
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#d9853b]" />
              noutro lugar
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#6a645c]" />
              fora da combinação
            </li>
          </ul>
          <BookSafe
            status={bookStatus}
            slots={slots}
            locked={locked}
            feedback={lastAttempt?.slots ?? null}
            focusIndex={status === "playing" ? focusIndex : null}
            secret={
              process.env.NODE_ENV !== "production" && ready ? secret : undefined
            }
            onSlotClick={handleSlotClick}
          />
        </section>

        <section className="flex w-full flex-1 flex-col gap-4 pb-8 lg:max-w-md lg:pt-6">
          <div
            className="rounded-xl border border-[#c9a227]/25 bg-[#140e0a]/70 p-4 backdrop-blur-sm"
            aria-live="polite"
            data-testid="feedback-banner"
          >
            {status === "won" ? (
              <div className="space-y-2 text-center">
                <p className="font-heading text-xl text-[#e8c547]">{copy.winTitle}</p>
                <p className="text-[color:var(--parchment)]">{copy.winBody}</p>
                <PrizeShowcase />
                <p className="font-heading text-sm text-[#c9a227]">{copy.winVerse}</p>
              </div>
            ) : status === "lost" ? (
              <div className="space-y-2 text-center">
                <p className="font-heading text-xl text-[#d9cbb3]">{copy.loseTitle}</p>
                <p className="text-[color:var(--parchment-dim)]">{copy.loseBody}</p>
                {ready ? (
                  <p className="font-heading text-sm text-[#e8c547]">
                    {copy.secretWas}: {formatSecret(secret)}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <p className="text-[color:var(--parchment)]">
                  {lastAttempt
                    ? copy.feedback(
                        lastAttempt.correctPositions,
                        lastAttempt.presentCount,
                      )
                    : missing > 0
                      ? copy.missingKeys(missing)
                      : lastGuessMatches
                        ? copy.sameGuess
                        : copy.pickPrompt}
                </p>
                <p className="sr-only">{liveMessage}</p>
              </div>
            )}
          </div>

          {attempts.length > 0 ? (
            <ol className="space-y-2">
              {attempts.map((attempt, attemptIndex) => (
                <li
                  key={attemptIndex}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#c9a227]/15 bg-[#1a120c]/60 px-3 py-2"
                >
                  <span className="font-heading text-[11px] tracking-wider text-[#c9a227] uppercase">
                    {copy.attempt(attemptIndex + 1)}
                  </span>
                  <span className="flex gap-1">
                    {attempt.guess.map((id, slotIndex) => {
                      const tone = attempt.slots[slotIndex];
                      return (
                        <span
                          key={`${attemptIndex}-${slotIndex}`}
                          title={getKey(id).name}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-heading",
                            tone === "correct" &&
                              "border-[#e8c547] bg-[#e8c547]/20 text-[#f3d56a]",
                            tone === "present" &&
                              "border-[#d9853b] bg-[#d9853b]/20 text-[#ffc07a]",
                            tone === "absent" &&
                              "border-[#5a5348] bg-[#2a241c] text-[#8a8378]",
                          )}
                        >
                          {id}
                        </span>
                      );
                    })}
                  </span>
                </li>
              ))}
            </ol>
          ) : null}

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {KEYS.map((key) => {
              const inUse = slots.includes(key.id);
              const isLockedIn = slots.some(
                (slot, index) => slot === key.id && locked[index],
              );
              const unavailable =
                status !== "playing" || shaking || isLockedIn || inUse;

              return (
                <button
                  key={key.id}
                  type="button"
                  disabled={status !== "playing" || shaking || isLockedIn || inUse}
                  onClick={() => insertKey(key.id)}
                  data-testid={`key-${key.id}`}
                  aria-label={`${key.name}, ${key.epithet}${isLockedIn ? ` — ${copy.keyLocked}` : inUse ? ` — ${copy.keyUsed}` : ""}`}
                  className={cn(
                    "flex flex-col items-center rounded-lg border border-[#c9a227]/20 bg-[#1a120c]/50 px-1 py-2 transition",
                    "hover:border-[#e8c547]/60 hover:bg-[#2a1a12]/80",
                    "focus-visible:ring-2 focus-visible:ring-[#e8c547] focus-visible:outline-none",
                    unavailable && "hover:border-[#c9a227]/20 hover:bg-[#1a120c]/50",
                  )}
                >
                  <OrnateKey
                    keyDef={key}
                    label
                    dimmed={inUse || status !== "playing"}
                    selected={inUse}
                    locked={isLockedIn}
                  />
                </button>
              );
            })}
          </div>

          <div className="sticky bottom-3 z-20 mt-1 flex flex-col gap-2 sm:static sm:flex-row">
            {status === "playing" ? (
              <>
                <Button
                  size="lg"
                  disabled={!canSubmit}
                  onClick={submitAttempt}
                  data-testid="submit-attempt"
                  className="h-12 flex-1 bg-[#c9a227] font-heading text-base tracking-wide text-[#1a120c] hover:bg-[#e8c547] disabled:opacity-40"
                >
                  {copy.tryLock}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={clearUnlocked}
                  className="h-12 border-[#c9a227]/40 bg-transparent font-heading text-[#e8c547] hover:bg-[#e8c547]/10"
                >
                  {copy.clearUnlocked}
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                onClick={startNewVolume}
                data-testid="retry-game"
                className="h-12 w-full bg-[#c9a227] font-heading text-base tracking-wide text-[#1a120c] hover:bg-[#e8c547]"
              >
                {copy.retry}
              </Button>
            )}
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-4 pb-5 text-center text-xs tracking-wide text-[#8a8378] sm:px-8">
        {copy.footer}
      </footer>
    </div>
  );
}
