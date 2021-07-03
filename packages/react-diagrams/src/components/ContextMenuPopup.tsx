import { FunctionComponent, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CONTEXT_MENU_POPUP } from "../testIds";

const ContextMenuPopupRoot = styled.div<{ clientX: number; clientY: number }>(
  ({ clientX, clientY }) => ({
    background: "white",
    position: "fixed",
    left: clientX,
    top: clientY,
    zIndex: 99999,
  })
);

export const ContextMenuPopup: FunctionComponent<{
  clientX: number;
  clientY: number;
  onClose: () => void;
}> = ({ children, clientX, clientY, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const isInsideClick = (ev: MouseEvent, element: HTMLDivElement) =>
      [...document.elementsFromPoint(ev.clientX, ev.clientY)].includes(element);
    const mouseDown = (ev: MouseEvent) => {
      if (!ref.current) return;
      if (!isInsideClick(ev, ref.current)) onClose();
    };
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("click", onClose);
    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("click", onClose);
    };
  }, [onClose]);
  return createPortal(
    <ContextMenuPopupRoot
      data-testid={CONTEXT_MENU_POPUP}
      clientX={clientX}
      clientY={clientY}
      ref={ref}
    >
      {children}
    </ContextMenuPopupRoot>,
    document.body
  );
};
