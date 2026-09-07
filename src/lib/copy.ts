export const copy = {
  title: "Livro-Cofre",
  tagline: "O livro é um cofre. As chaves são o enigma.",
  howTo: "Como abrir",
  howToTitle: "O fecho antigo",
  howToBody: [
    "Este volume fecha-se com quatro chaves, numa ordem secreta.",
    "Tens dez chaves e apenas três tentativas. Cada tentativa gasta uma chance.",
    "Chaves no sítio certo ficam presas no fecho. As outras podem ser trocadas.",
  ],
  legendCorrect: "Ouro — chave certa no lugar certo",
  legendPresent: "Âmbar — chave certa, noutro lugar",
  legendAbsent: "Cinza — esta chave não pertence à combinação",
  closeHowTo: "Entendi",
  pickPrompt: "Escolhe quatro chaves e experimenta o fecho.",
  missingKeys: (n: number) =>
    n === 1 ? "Falta uma chave no fecho." : `Faltam ${n} chaves no fecho.`,
  tryLock: "Tentar o fecho",
  clearUnlocked: "Retirar as soltas",
  sameGuess: "Muda a combinação antes de tentar outra vez.",
  chancesLabel: "Tentativas",
  chanceLeft: {
    3: "Três tentativas. O livro espera.",
    2: "Duas tentativas. O ferro ainda cede.",
    1: "Última tentativa. O cofre impacienta-se.",
    0: "Não restam tentativas.",
  } as Record<number, string>,
  feedback: (correct: number, present: number) => {
    const a =
      correct === 1 ? "1 no lugar certo" : `${correct} no lugar certo`;
    const b =
      present === 1
        ? "1 certa noutro lugar"
        : `${present} certas noutro lugar`;
    return `${a} · ${b}`;
  },
  winTitle: "O livro abriu-se",
  winBody:
    "O fecho cedeu. As páginas antigas recebem a luz e o segredo deixa de ser de ninguém.",
  winVerse:
    "Quem guarda um livro, guarda um mundo. Quem abre um cofre, escolhe o que o mundo lembra.",
  loseTitle: "O cofre selou-se",
  loseBody:
    "O ferro esfria. As correntes fecham. O volume recusa-se a abrir — neste livro, o segredo ficou entre as páginas.",
  secretWas: "A combinação era",
  retry: "Abrir outro volume",
  attempt: (n: number) => `Tentativa ${n}`,
  footer: "Um jogo para Max Kobayashi",
  slotLabel: (n: number) => `Fecho ${n}`,
  keyUsed: "já está no fecho",
  keyLocked: "presa no lugar certo",
};
