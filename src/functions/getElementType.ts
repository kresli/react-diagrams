import { ElementType } from "../types";

const key = "diagramelement";

export const ELEMENT_TYPE_KEY = `data-${key}`;

export const getELementType = (elem: HTMLElement): ElementType | undefined => {
  return elem.dataset[key] as ElementType | undefined;
};
