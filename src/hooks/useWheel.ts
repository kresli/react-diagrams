import { useCallback } from "react";

export function useWheel(
  onZoom: (data: { deltaY: number; clientX: number; clientY: number }) => void
) {
  return useCallback(
    (element: HTMLElement) => {
      if (!element) return;
      function onWheel({ deltaY, clientX, clientY }: WheelEvent) {
        onZoom({ deltaY, clientY, clientX });
      }
      element.addEventListener("wheel", onWheel);
    },
    [onZoom]
  );
}
