import { MutableRefObject, useLayoutEffect } from "react";

export enum ElementType {
  CANVAS = "CANVAS",
  LINK = "LINK",
  NODE = "NODE",
  PORT = "PORT",
}

const key = "diagramelement";

export const ELEMENT_TYPE_KEY = `data-${key}`;

export const createElementKey = (type: ElementType) => ({
  [ELEMENT_TYPE_KEY]: type,
});

export const getELementType = (elem: HTMLElement) => {
  return elem.dataset[key];
};

export const registerElementType = (
  element: { setAttribute: (key: string, value: string) => any },
  type: ElementType
) => element.setAttribute(ELEMENT_TYPE_KEY, type);

export const useRegisterElement = (
  ref: MutableRefObject<{
    setAttribute: (key: string, value: string) => any;
  } | null>,
  type: ElementType
) => {
  useLayoutEffect(() => {
    if (!ref.current)
      throw new Error(`LinkRenderer must reference element with "lineRef"`);
    registerElementType(ref.current, type);
  }, [ref, type]);
};
