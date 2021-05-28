import { MutableRefObject, useLayoutEffect } from "react";
import { setElementId, setElementType } from "../functions";
import { ElementType } from "../types";

type Ref = MutableRefObject<{
  setAttribute: (key: string, value: string) => any;
} | null>;

export function useRegisterElement(
  ref: Ref,
  type: ElementType,
  data: { id: string }
): void {
  const { id } = data;
  useLayoutEffect(() => {
    if (!ref.current) return;
    setElementType(ref.current, type);
    setElementId(ref.current, id);
  }, [ref, type, id]);
}
