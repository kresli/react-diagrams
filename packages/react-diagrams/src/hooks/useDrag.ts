import { useCallback, useLayoutEffect, useRef, useState } from "react";

type DragCallback = (movementX: number, movementY: number) => void;

export const useDrag = (ref: HTMLElement | null, onDragging: DragCallback) => {
  // we need to reasign always callback otherwise we would be out of sync
  // and we would call previous onDragging callback
  const [dragging, setDragging] = useState(false);
  const onDrag = useRef<DragCallback>(null as any as DragCallback);
  onDrag.current = onDragging;

  const mouseMove = useCallback(
    (ev) => {
      if (!dragging) return;
      if (ev.buttons !== 1) {
        setDragging(false);
        return;
      }
      ev.preventDefault();
      ev.stopImmediatePropagation();
      onDrag.current(ev.movementX, ev.movementY);
    },
    [dragging]
  );

  const onMouseDown = useCallback((ev) => {
    if (ev.buttons !== 1) return;
    setDragging(true);
  }, []);

  const onMouseUp = useCallback(
    (ev) => {
      if (dragging) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
      setDragging(false);
    },
    [dragging]
  );

  useLayoutEffect(() => {
    if (!ref) return;
    ref.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mouse", onMouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseMove, onMouseDown, onMouseUp, ref]);
};
