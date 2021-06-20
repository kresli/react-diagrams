import { FunctionComponent, memo, useEffect, useMemo, useState } from "react";
import React from "react";

// @TODO: optimize
export const useContextMenu = () => {
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (!triggerRef) return;
    const onContextMenu = (ev: MouseEvent) => {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      setPosition([ev.clientX, ev.clientY]);
    };
    const onMouseDown = (ev: MouseEvent) => setPosition(null);
    window.addEventListener("click", onMouseDown);
    triggerRef.addEventListener("contextmenu", onContextMenu);
    return () => {
      triggerRef.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("click", onMouseDown);
    };
  }, [triggerRef]);
  const ContextMenu: FunctionComponent = useMemo(() => {
    return ({ children }) => (
      <>
        {position && (
          <ContextMenuPopup x={position[0]} y={position[1]}>
            {children}
          </ContextMenuPopup>
        )}
      </>
    );
  }, [position]);

  return useMemo(
    () => ({
      ContextMenu,
      setContextTrigger: setTriggerRef,
      contextPosition: position,
    }),
    [ContextMenu, position]
  );
};

const ContextMenuPopup: FunctionComponent<{ x: number; y: number }> = memo(
  ({ children, x, y }) => {
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
  }
);
