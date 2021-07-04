import { RefObject, useLayoutEffect } from "react";
import { SchemaActionType, setElementId, setElementType } from "../functions";
import { ElementType } from "../types";
import { useAction } from "./useAction";

export function useRegisterElement<T extends HTMLElement | SVGElement>(
  // @todo maybe we dont need to pass refObject but pure Element?
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
      id,
    });
    return () =>
      action({
        type,
        element,
        elementType,
        register: false,
        id,
      });
  }, [action, elementType, id, ref]);
}

export function useRegElement<T extends HTMLElement>(
  element: T | null,
  elementType: ElementType,
  id?: string
) {
  if (!element) return;
  setElementType(element, elementType);
  if (id) setElementId(element, id);
}
