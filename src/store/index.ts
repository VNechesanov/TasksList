import { CardItem } from "../Layout/Layout";
import { LayoutItem } from "../App";

export const saveCardsToLocalStorage = (card: CardItem[], key: string) => {
  localStorage.setItem(key, JSON.stringify(card));
};

export const getCardsfromLocalStorage = (key: string): CardItem[] => {
  let cards: CardItem[] = JSON.parse(localStorage.getItem(key) || "[]");

  return cards;
};

export const saveSectionsToLocalStorage = (section: LayoutItem[]) => {
  localStorage.setItem(`sections`, JSON.stringify(section));
};

export const getSectionsFromLocalStorage = (): LayoutItem[] => {
  let sections: LayoutItem[] = JSON.parse(
    localStorage.getItem(`sections`) || "[]"
  );

  return sections;
};
