import { useState, useEffect, useRef } from 'react';

type DragCallback = (movementX: number, movementY: number) => void;

export const useDrag = (onDragCb: DragCallback) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const onDrag = useRef<DragCallback>((null as any) as DragCallback);
  onDrag.current = onDragCb;
  useEffect(() => {
    if (!ref) return;
    let onMouseMove = () => {};
    const onMouseDown = (ev: MouseEvent) => {
      if (ev.buttons !== 1) return;
      const mouseMove = (ev: MouseEvent) => {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        if (!ev.buttons) window.removeEventListener('mousemove', mouseMove);
        onDrag.current(ev.movementX, ev.movementY);
      };
      window.addEventListener('mousemove', mouseMove);
    };
    ref.addEventListener('mousedown', onMouseDown);
    return () => {
      ref.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [ref]);

  return setRef;
};
