import { RefObject, useCallback, useLayoutEffect, useRef } from "react";

export function useWheel(
  ref: RefObject<HTMLElement | null>,
  onZoom: (event: WheelEvent) => void
) {
  // const zoom = useRef(onZoom);
  // zoom.current = onZoom;
  // return useCallback(
  //   (element: HTMLElement) => {
  //     if (!element) return;
  //     function onWheel({ deltaY, clientX, clientY }: WheelEvent) {
  //       onZoom({ deltaY, clientY, clientX });
  //     }
  //     element.addEventListener("wheel", onWheel);
  //   },
  //   [onZoom]
  // );
  const onWheel = useCallback((event: WheelEvent) => onZoom(event), [onZoom]);
  useLayoutEffect(() => {
    ref.current?.addEventListener("wheel", onWheel);
  }, [onWheel, ref]);
}
