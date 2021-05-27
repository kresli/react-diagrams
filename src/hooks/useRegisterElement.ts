import { MutableRefObject, useLayoutEffect } from "react";
import { ELEMENT_TYPE_KEY } from "../functions/getElementType";
import { ElementType } from "../types";

export const useRegisterElement = (
  ref: MutableRefObject<{
    setAttribute: (key: string, value: string) => any;
  } | null>,
  type: ElementType
) => {
  useLayoutEffect(() => {
    if (!ref.current)
      throw new Error(`LinkRenderer must reference element with "lineRef"`);
    ref.current.setAttribute(ELEMENT_TYPE_KEY, type as string);
  }, [ref, type]);
};
