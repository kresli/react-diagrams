import { ElementType } from "../types";

const prefix = "diagramelement";

export const ELEMENT_TYPE = `${prefix}type`;
export const ELEMENT_ID = `${prefix}id`;

export function getELementType<T extends HTMLElement | SVGElement>(
  elem: T
): ElementType | undefined {
  return elem.dataset[ELEMENT_TYPE] as ElementType | undefined;
}

type Elem = { setAttribute: (key: string, value: string) => any };
export function setElementType<T extends HTMLElement | SVGElement>(
  elem: T,
  type: ElementType
) {
  (elem as any).setAttribute(`data-${ELEMENT_TYPE}`, type as string);
  return elem;
}

export const setElementId = (elem: Elem, id: string) => {
  elem.setAttribute(`data-${ELEMENT_ID}`, id);
  return elem;
};

export const getElementId = (elem: HTMLElement): string | undefined => {
  return elem.dataset[ELEMENT_ID];
};

export const getIdSelector = (id: string) => `[data-${ELEMENT_ID}="${id}"]`;

export const queryElements = (
  type: ElementType,
  id?: string
): NodeListOf<HTMLElement> => {
  const typeSelector = `[data-${ELEMENT_TYPE}="${type}"]`;
  const idSelector = id ? getIdSelector(id) : "";
  return document.querySelectorAll(`${typeSelector}${idSelector}`);
};
