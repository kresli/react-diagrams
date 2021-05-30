import { getELementType } from ".";
import { ElementType } from "../types";

export const clientToElementType = (
  clientX: number,
  clientY: number
): ElementType[] => {
  return document
    .elementsFromPoint(clientX, clientY)
    .map((elem) => {
      return getELementType(elem as HTMLElement);
    })
    .filter((v) => v) as ElementType[];
};
