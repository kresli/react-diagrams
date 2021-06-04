import { useEffect } from "react";

export function useEvent<T extends Window, E extends keyof WindowEventMap>(
  ref: T | null,
  eventType: E,
  cb: (event: WindowEventMap[E]) => void
): void;
export function useEvent<
  T extends HTMLElement,
  E extends keyof HTMLElementEventMap
>(
  ref: T | null,
  eventType: E,
  cb: (event: HTMLElementEventMap[E]) => void
): void;
export function useEvent<T extends HTMLElement | Window>(
  ref: T,
  eventType: string,
  cb: (event: any) => void
): void {
  useEffect(() => {
    if (!ref) return;
    ref.addEventListener(eventType, cb);
    return () => ref.removeEventListener(eventType, cb);
  }, [ref, cb, eventType]);
}
