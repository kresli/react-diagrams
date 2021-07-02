import { FunctionComponent, memo, useRef, useCallback, useEffect } from "react";
import { SchemaPort } from "../types";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import { CSSProperties } from "styled-components";
import React from "react";
import { PORT } from "../testIds";

export const Port: FunctionComponent<{
  port: SchemaPort;
  style?: CSSProperties;
}> = memo(({ port, children, style }) => {
  const { id } = port;
  const action = useAction();
  const ref = useRef<HTMLDivElement | null>(null);
  const onClick = useCallback(
    (ev: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = ev;
      ev.stopPropagation();
      ev.preventDefault();
      action({
        type: SchemaActionType.CREATE_DRAGGING_LINK,
        clientX,
        clientY,
        portId: id,
      });
    },
    [action, id]
  );

  // this should be switched to inline <div onCLick onMouse> with react 18

  useEffect(() => {
    ref.current?.addEventListener("click", onClick);
  }, [onClick]);

  return (
    <div data-testid={PORT(id)} ref={ref} style={style}>
      {children}
    </div>
  );
});
