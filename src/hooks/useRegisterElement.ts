import { RefObject, useLayoutEffect } from "react";
import { SchemaActionType } from "../functions";
import { ElementType } from "../types";
import { useAction } from "./useAction";

export function useRegisterElement<T extends HTMLElement | SVGElement>(
  ref: RefObject<T | null>,
  elementType: ElementType,
  id?: string
) {
  const action = useAction();
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const type = SchemaActionType.REGISTER_ELEMENT_TYPE;
    action({
      type,
      element,
      elementType,
      register: true,
    });
    return () =>
      action({
        type,
        element,
        elementType,
        register: false,
      });
  }, [action, elementType, ref]);
}
