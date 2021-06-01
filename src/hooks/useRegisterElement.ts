import { RefObject, useLayoutEffect } from "react";
import { SchemaActionType, setElementType } from "../functions";
import { ElementType } from "../types";
import { useAction } from "./useAction";

// type Ref = MutableRefObject<{
//   setAttribute: (key: string, value: string) => any;
// } | null>;

// export function useRegisterElement(
//   ref: Ref,
//   type: ElementType,
//   data: { id: string }
// ): void {
//   const { id } = data;
//   useLayoutEffect(() => {
//     if (!ref.current) return;
//     setElementType(ref.current, type);
//     setElementId(ref.current, id);
//   }, [ref, type, id]);
// }

export function useRegisterElement<T extends HTMLElement | SVGElement>(
  ref: RefObject<T | null>,
  elementType: ElementType,
  data?: any
) {
  const action = useAction();
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const type = SchemaActionType.REGISTER_ELEMENT_TYPE;
    setElementType(element, elementType);
    action({
      type,
      element,
      elementType,
      data,
      register: true,
    });
    return () =>
      action({
        type,
        element,
        elementType,
        register: false,
        data,
      });
  }, [action, data, elementType, ref]);
}
