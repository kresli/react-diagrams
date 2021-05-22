import { FunctionComponent, memo, useEffect, useMemo, useState } from 'react';
import React from 'react';
// @TODO: optimize
export const useContextMenu = (Popup: FunctionComponent) => {
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (!triggerRef) return;
    const onContextMenu = (ev: MouseEvent) => {
      ev.stopImmediatePropagation();
      ev.preventDefault();
      setVisible([ev.clientX, ev.clientY]);
    };
    const onMouseDown = (ev: MouseEvent) => {
      if (ev.buttons !== 1) return;
      setVisible(null);
    };
    window.addEventListener('mousedown', onMouseDown);
    triggerRef.addEventListener('contextmenu', onContextMenu);
    return () => {
      triggerRef.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [triggerRef]);
  const ContextMenu = useMemo(() => {
    return () => (
      <>
        {visible && (
          <ContextMenuPopup x={visible[0]} y={visible[1]}>
            <Popup />
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
          background: 'white',
          position: 'fixed',
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
