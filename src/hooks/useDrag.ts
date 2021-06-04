import { useCallback, useLayoutEffect, RefObject, useRef } from "react";

type DragCallback = (movementX: number, movementY: number) => void;

export const useDrag = (
  ref: RefObject<HTMLElement | null>,
  onDragging: DragCallback,
  stopPropagation = false
) => {
  // we need to reasign always callback otherwise we would be out of sync
  // and we would call previous onDragging callback
  const onDrag = useRef<DragCallback>((null as any) as DragCallback);
  onDrag.current = onDragging;
  const onMouseDown = useCallback(
    (ev: MouseEvent) => {
      if (ev.buttons !== 1) return;
      const mouseMove = (ev: MouseEvent) => {
        ev.preventDefault();
        if (stopPropagation) ev.stopImmediatePropagation();
        if (!ev.buttons) window.removeEventListener("mousemove", mouseMove);
        onDrag.current(ev.movementX, ev.movementY);
      };
      window.addEventListener("mousemove", mouseMove);
    },
    [stopPropagation]
  );

  useLayoutEffect(() => {
    ref.current?.addEventListener("mousedown", onMouseDown);
  }, [onMouseDown, ref]);
};
