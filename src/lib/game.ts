import { KEYS } from "./keys.ts";

export const CODE_LENGTH = 4;
export const MAX_ATTEMPTS = 4;
export const KEY_COUNT = KEYS.length;

export type SlotFeedback = "correct" | "present" | "absent";

export type Attempt = {
  guess: number[];
  slots: SlotFeedback[];
  correctPositions: number;
  presentCount: number;
};

export type GameStatus = "playing" | "won" | "lost";

export function createSecret(
  length: number = CODE_LENGTH,
  pool: number[] = KEYS.map((key) => key.id),
): number[] {
  if (length > pool.length) {
    throw new Error("A combinação não pode ser maior do que o molho de chaves.");
  }

  const remaining = [...pool];
  const secret: number[] = [];

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * remaining.length);
    secret.push(remaining.splice(index, 1)[0]);
  }

  return secret;
}

export function evaluateGuess(secret: number[], guess: number[]): Attempt {
  if (secret.length !== guess.length) {
    throw new Error("A tentativa tem de ter o mesmo comprimento da combinação.");
  }

  const slots: SlotFeedback[] = Array(guess.length).fill("absent");
  const secretUsed = Array(secret.length).fill(false);
  const guessUsed = Array(guess.length).fill(false);

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      slots[i] = "correct";
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (guessUsed[i]) continue;

    const matchIndex = secret.findIndex(
      (id, index) => !secretUsed[index] && id === guess[i],
    );

    if (matchIndex !== -1) {
      slots[i] = "present";
      secretUsed[matchIndex] = true;
    }
  }

  return {
    guess: [...guess],
    slots,
    correctPositions: slots.filter((slot) => slot === "correct").length,
    presentCount: slots.filter((slot) => slot === "present").length,
  };
}

export function isWinningAttempt(attempt: Attempt, length = CODE_LENGTH) {
  return attempt.correctPositions === length;
}

export function lockedSlotsFromAttempts(attempts: Attempt[], length = CODE_LENGTH) {
  const locked = Array(length).fill(false);
  const last = attempts.at(-1);
  if (!last) return locked;

  last.slots.forEach((slot, index) => {
    if (slot === "correct") locked[index] = true;
  });

  return locked;
}

export function feedbackSummary(attempt: Attempt) {
  return {
    correct: attempt.correctPositions,
    present: attempt.presentCount,
  };
}
