export const PRIZES = [
  { id: "dinheiro", name: "Dinheiro" },
  { id: "tablet", name: "Tablet" },
  { id: "iphone", name: "iPhone" },
  { id: "macbook", name: "MacBook" },
  { id: "airpods", name: "AirPods" },
] as const;

export type PrizeId = (typeof PRIZES)[number]["id"];
