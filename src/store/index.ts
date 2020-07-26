import { CardItem } from "../Layout/Layout";

const CARD_KEY = "card_props";

export const saveCardsToLocalStorage = (card: CardItem[]) => {
  localStorage.setItem(CARD_KEY, JSON.stringify(card));
};

export const getCardsfromLocalStorage = (): CardItem[] => {
  let cards: CardItem[] = JSON.parse(localStorage.getItem(CARD_KEY) || "[]");

  return cards;
};
