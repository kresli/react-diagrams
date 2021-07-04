export const useContextMenu = (
  ref: HTMLElement | null,
  onContextMenu: (ev: MouseEvent) => void
) => {
  const context = (ev: MouseEvent) => {
    ev.stopImmediatePropagation();
    ev.preventDefault();
    onContextMenu(ev);
  };
  ref?.addEventListener("contextmenu", context);
  return () => ref?.removeEventListener("contextmenu", context);
};
