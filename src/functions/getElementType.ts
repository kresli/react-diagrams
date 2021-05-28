import { ElementType } from "../types";

const prefix = "diagramelement";

export const ELEMENT_TYPE = `${prefix}type`;
export const ELEMENT_ID = `${prefix}id`;

export const getELementType = (elem: HTMLElement): ElementType | undefined => {
  return elem.dataset[ELEMENT_TYPE] as ElementType | undefined;
};

type Elem = { setAttribute: (key: string, value: string) => any };
export const setElementType = (elem: Elem, type: ElementType) => {
  elem.setAttribute(`data-${ELEMENT_TYPE}`, type as string);
};

export const setElementId = (elem: Elem, id: string) => {
  elem.setAttribute(`data-${ELEMENT_ID}`, id);
};

export const getElementId = (elem: HTMLElement): string | undefined => {
  return elem.dataset[ELEMENT_ID];
};
