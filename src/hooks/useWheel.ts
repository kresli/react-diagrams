import { useCallback, useRef } from 'react';

export function useWheel(
  onZoom: (data: { deltaY: number; clientX: number; clientY: number }) => void
) {
  const zoom = useRef(onZoom);
  zoom.current = onZoom;
  return useCallback(
    (element: HTMLElement) => {
      if (!element) return;
      function onWheel({ deltaY, clientX, clientY }: WheelEvent) {
        zoom.current({ deltaY, clientY, clientX });
      }
      element.addEventListener('wheel', onWheel);
    },
    [onZoom]
  );
}
