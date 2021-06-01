// import { useState, useEffect, useRef, useCallback } from "react";

// type DragCallback = (movementX: number, movementY: number) => void;

// export const useDragElem = (ref: HTMLElement | null, onDrag: DragCallback) => {
//   const memoRef = useRef<HTMLElement | null>();
//   // const onDrag = useRef<DragCallback>((null as any) as DragCallback);
//   // onDrag.current = onDragCb;

//   const onMouseDown = useCallback(
//     (ev: MouseEvent) => {
//       if (ev.buttons !== 1) return;
//       const mouseMove = (ev: MouseEvent) => {
//         ev.preventDefault();
//         ev.stopImmediatePropagation();
//         if (!ev.buttons) window.removeEventListener("mousemove", mouseMove);
//         onDrag(ev.movementX, ev.movementY);
//       };
//       window.addEventListener("mousemove", mouseMove);
//     },
//     [onDrag]
//   );

//   useEffect(() => {
//     console.log(ref);
//     if (!ref) {
//       memoRef.current?.removeEventListener("mousedown", onMouseDown);
//       return;
//     }
//     ref.addEventListener("mousedown", onMouseDown);
//   }, [onMouseDown, ref]);

//   // const [ref, setRef] = useState<HTMLDivElement | null>(null);
//   // const onDrag = useRef<DragCallback>((null as any) as DragCallback);
//   // onDrag.current = onDragCb;
//   // useEffect(() => {
//   //   if (!ref) return;
//   //   const onMouseDown = (ev: MouseEvent) => {
//   //     if (ev.buttons !== 1) return;
//   //     const mouseMove = (ev: MouseEvent) => {
//   //       ev.preventDefault();
//   //       ev.stopImmediatePropagation();
//   //       if (!ev.buttons) window.removeEventListener("mousemove", mouseMove);
//   //       onDrag.current(ev.movementX, ev.movementY);
//   //     };
//   //     window.addEventListener("mousemove", mouseMove);
//   //   };
//   //   ref.addEventListener("mousedown", onMouseDown);
//   //   return () => {
//   //     ref.removeEventListener("mousedown", onMouseDown);
//   //   };
//   // }, [ref]);

//   // return setRef;
// };

// export const useDrag = (onDragCb: DragCallback) => {
//   const [ref, setRef] = useState<HTMLDivElement | null>(null);
//   const onDrag = useRef<DragCallback>((null as any) as DragCallback);
//   onDrag.current = onDragCb;
//   useEffect(() => {
//     if (!ref) return;
//     let onMouseMove = () => {};
//     const onMouseDown = (ev: MouseEvent) => {
//       if (ev.buttons !== 1) return;
//       const mouseMove = (ev: MouseEvent) => {
//         ev.preventDefault();
//         ev.stopImmediatePropagation();
//         if (!ev.buttons) window.removeEventListener("mousemove", mouseMove);
//         onDrag.current(ev.movementX, ev.movementY);
//       };
//       window.addEventListener("mousemove", mouseMove);
//     };
//     ref.addEventListener("mousedown", onMouseDown);
//     return () => {
//       ref.removeEventListener("mousedown", onMouseDown);
//       window.removeEventListener("mousemove", onMouseMove);
//     };
//   }, [ref]);

//   return setRef;
// };
export {};
