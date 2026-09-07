# Livro-Cofre

Um mini-jogo de browser: um livro antigo que é também um cofre. O jogador tem **dez chaves** e **quatro tentativas** para descobrir a sequência secreta de quatro chaves.

Se o fecho ceder, o livro abre-se e revela o tesouro: dinheiro, tablet, MacBook e AirPods. Se as quatro tentativas falharem, o cofre sela-se.

## Como jogar

1. Escolhe quatro das dez chaves e coloca-as nos fechos do livro.
2. Toca em **Tentar o fecho** — cada tentativa gasta uma chance.
3. O livro responde:
   - **Ouro** — chave certa no lugar certo (fica presa).
   - **Âmbar** — chave certa, mas noutro lugar.
   - **Cinza** — esta chave não faz parte da combinação.
4. Ajusta as chaves soltas e tenta de novo. À quarta falha, o volume fecha-se de vez (neste livro).

Podes começar outro volume a qualquer momento depois de ganhar ou perder.

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

```bash
npm test
npm run lint
```

## Stack

Next.js (App Router), TypeScript, Tailwind CSS e shadcn/ui. Pronto a publicar na Vercel — sem autenticação nem base de dados.
