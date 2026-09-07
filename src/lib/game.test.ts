import assert from "node:assert/strict";
import test from "node:test";
import {
  CODE_LENGTH,
  KEY_COUNT,
  MAX_ATTEMPTS,
  createSecret,
  evaluateGuess,
  isWinningAttempt,
  lockedSlotsFromAttempts,
} from "./game.ts";

test("constantes do jogo", () => {
  assert.equal(KEY_COUNT, 10);
  assert.equal(MAX_ATTEMPTS, 3);
  assert.equal(CODE_LENGTH, 4);
});

test("combinação secreta usa chaves únicas", () => {
  const secret = createSecret(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.equal(secret.length, 4);
  assert.equal(new Set(secret).size, 4);
});

test("acerto total abre o cofre", () => {
  const attempt = evaluateGuess([1, 2, 3, 4], [1, 2, 3, 4]);
  assert.equal(attempt.correctPositions, 4);
  assert.equal(attempt.presentCount, 0);
  assert.equal(isWinningAttempt(attempt), true);
});

test("chaves certas noutro lugar", () => {
  const attempt = evaluateGuess([1, 2, 3, 4], [2, 1, 8, 9]);
  assert.equal(attempt.correctPositions, 0);
  assert.equal(attempt.presentCount, 2);
  assert.deepEqual(attempt.slots, ["present", "present", "absent", "absent"]);
});

test("não conta a mesma chave duas vezes", () => {
  const attempt = evaluateGuess([1, 2, 3, 4], [1, 1, 1, 1]);
  assert.equal(attempt.correctPositions, 1);
  assert.equal(attempt.presentCount, 0);
});

test("posição certa trava no último palpite", () => {
  const attempt = evaluateGuess([3, 1, 8, 2], [3, 9, 8, 10]);
  const locked = lockedSlotsFromAttempts([attempt]);
  assert.deepEqual(locked, [true, false, true, false]);
});
