export const KEY_SYMBOLS = [
  "star",
  "moon",
  "sun",
  "leaf",
  "flame",
  "drop",
  "eye",
  "crown",
  "skull",
  "heart",
] as const;

export type KeySymbol = (typeof KEY_SYMBOLS)[number];

export type KeyDef = {
  id: number;
  name: string;
  epithet: string;
  color: string;
  glow: string;
  dark: string;
  symbol: KeySymbol;
};

export const KEYS: KeyDef[] = [
  {
    id: 1,
    name: "Estrela",
    epithet: "ouro antigo",
    color: "#E8C547",
    glow: "#FFE566",
    dark: "#8A6A12",
    symbol: "star",
  },
  {
    id: 2,
    name: "Lua",
    epithet: "prata fria",
    color: "#C9D4E0",
    glow: "#EEF4FF",
    dark: "#5C6A78",
    symbol: "moon",
  },
  {
    id: 3,
    name: "Sol",
    epithet: "cobre quente",
    color: "#E08A3C",
    glow: "#FFC07A",
    dark: "#8A4A16",
    symbol: "sun",
  },
  {
    id: 4,
    name: "Folha",
    epithet: "bronze vivo",
    color: "#B08A4A",
    glow: "#D4B06A",
    dark: "#5C4318",
    symbol: "leaf",
  },
  {
    id: 5,
    name: "Chama",
    epithet: "rubi",
    color: "#D4453A",
    glow: "#FF7A6E",
    dark: "#7A1C18",
    symbol: "flame",
  },
  {
    id: 6,
    name: "Gota",
    epithet: "safira",
    color: "#3B74D4",
    glow: "#7EB3FF",
    dark: "#163A7A",
    symbol: "drop",
  },
  {
    id: 7,
    name: "Olho",
    epithet: "esmeralda",
    color: "#2F9A5F",
    glow: "#6DDC9A",
    dark: "#145832",
    symbol: "eye",
  },
  {
    id: 8,
    name: "Coroa",
    epithet: "ametista",
    color: "#8B55C9",
    glow: "#C49BFF",
    dark: "#4A2278",
    symbol: "crown",
  },
  {
    id: 9,
    name: "Caveira",
    epithet: "obsidiana",
    color: "#6A6A76",
    glow: "#B0B0BE",
    dark: "#2A2A32",
    symbol: "skull",
  },
  {
    id: 10,
    name: "Coração",
    epithet: "pérola",
    color: "#EED8C6",
    glow: "#FFF4EA",
    dark: "#8A6E5C",
    symbol: "heart",
  },
];

export const KEY_BY_ID: Record<number, KeyDef> = Object.fromEntries(
  KEYS.map((key) => [key.id, key]),
);

export function getKey(id: number): KeyDef {
  const key = KEY_BY_ID[id];
  if (!key) {
    throw new Error(`Chave desconhecida: ${id}`);
  }
  return key;
}
