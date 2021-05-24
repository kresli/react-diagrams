import { FunctionComponent, memo, useEffect, useMemo, useState } from "react";
import React from "react";
// @TODO: optimize
export const useContextMenu = <P extends {}>(Popup: FunctionComponent<P>) => {
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (!triggerRef) return;
    const onContextMenu = (ev: MouseEvent) => {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      setVisible([ev.clientX, ev.clientY]);
    };
    const onMouseDown = (ev: MouseEvent) => setVisible(null);
    window.addEventListener("click", onMouseDown);
    triggerRef.addEventListener("contextmenu", onContextMenu);
    return () => {
      triggerRef.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("click", onMouseDown);
    };
  }, [triggerRef]);
  const ContextMenu: FunctionComponent<P> = useMemo(() => {
    return (props) => (
      <>
        {visible && (
          <ContextMenuPopup x={visible[0]} y={visible[1]}>
            <Popup {...props} />
          </ContextMenuPopup>
        )}
      </>
    );
  }, [Popup, visible]);
  return useMemo(
    () => ({
      ContextMenu,
      setContextTrigger: setTriggerRef,
    }),
    [ContextMenu]
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
