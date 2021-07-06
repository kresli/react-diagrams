import { useCallback, useLayoutEffect } from "react";

export function useWheel(
  // @todo can we not to use refObject here?
  ref: HTMLElement | null,
  onZoom: (event: WheelEvent) => void
) {
  // @todo do we need use useCallback here?
  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      onZoom(event);
    },
    [onZoom]
  );
  useLayoutEffect(() => {
    ref?.addEventListener("wheel", onWheel);
  }, [onWheel, ref]);
}
