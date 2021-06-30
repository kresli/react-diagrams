import {
  FunctionComponent,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import React from "react";
import { Ctx } from ".";
import { DiagramContextMenu } from "../components";

// @TODO: optimize
export const useContextMenu = (
  triggerRef: HTMLElement | null,
  ContextContent: DiagramContextMenu
): FunctionComponent => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (!triggerRef) return;
    const onContextMenu = (ev: MouseEvent) => {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      setPosition([ev.clientX, ev.clientY]);
    };
    const onMouseDown = () => setPosition(null);
    window.addEventListener("click", onMouseDown);
    triggerRef.addEventListener("contextmenu", onContextMenu);
    return () => {
      triggerRef.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("click", onMouseDown);
    };
  }, [triggerRef]);
  const contextMenu = useMemo(() => {
    if (!position) return <></>;
    const [clientX, clientY] = position;
    // console.log("show context");
    return (
      <ContextMenuPopup x={clientX} y={clientY}>
        <ContextContent clientX={clientX} clientY={clientY} />
      </ContextMenuPopup>
    );
  }, [ContextContent, position]);

  return () => contextMenu;
};

const ContextMenuPopup: FunctionComponent<{
  x: number;
  y: number;
}> = memo(({ children, x, y }) => {
  return (
    <div
      style={{
        background: "white",
        position: "fixed",
        left: x,
        top: y,
        zIndex: 99999,
      }}
    >
      {children}
    </div>
  );
});
