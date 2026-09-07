export const copy = {
  title: "Livro-Cofre",
  tagline: "O livro é um cofre. As chaves são o enigma.",
  howTo: "Como abrir",
  howToTitle: "O fecho antigo",
  howToBody: [
    "Este volume fecha-se com quatro chaves, numa ordem secreta.",
    "Tens dez chaves e apenas quatro tentativas. Cada tentativa gasta uma chance.",
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
    4: "Quatro tentativas. O livro espera.",
    3: "Três tentativas. O ferro ainda cede.",
    2: "Duas tentativas. O cofre impacienta-se.",
    1: "Última tentativa. O fecho quase tranca.",
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
  winTitle: "O cofre abriu-se",
  winBody:
    "O fecho cedeu. Lá dentro estava o tesouro: dinheiro, um tablet, um MacBook e uns AirPods.",
  winVerse:
    "Quem abre o Livro-Cofre leva o que o volume guardava: fortuna e aparelhos à luz do ouro.",
  treasureHidden: "Algo brilha lá dentro",
  treasureRevealed: "Tesouro do volume",
  loseTitle: "O cofre selou-se",
  loseBody:
    "O ferro esfria. As quatro chances acabaram. As correntes fecham e o tesouro — dinheiro, tablet, MacBook e AirPods — fica selado entre as páginas.",
  secretWas: "A combinação era",
  retry: "Abrir outro volume",
  attempt: (n: number) => `Tentativa ${n}`,
  footer: "Um jogo para Max Kobayashi",
  slotLabel: (n: number) => `Fecho ${n}`,
  keyUsed: "já está no fecho",
  keyLocked: "presa no lugar certo",
};
