import {
  FunctionComponent,
  memo,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { SchemaPort, ElementType } from "../types";
import { SchemaActionType } from "../functions";
import { useAction, useRegisterElement, useDrag } from "../hooks";
import { CSSProperties } from "styled-components";
import React from "react";

export const Port: FunctionComponent<{
  port: SchemaPort;
  style?: CSSProperties;
}> = memo(({ port, children, style }) => {
  const { id } = port;
  const action = useAction();
  const ref = useRef<HTMLDivElement | null>(null);
  useRegisterElement(ref, ElementType.PORT, id);
  useDrag(
    ref,
    useCallback(() => {}, [])
  );
  const onClick = useCallback(
    ({ clientX, clientY }: React.MouseEvent) => {
      if (!ref.current) return;
      action({
        type: SchemaActionType.CREATE_DRAGGING_LINK,
        clientX,
        clientY,
        portId: id,
        // direction:
        //   type === PortType.OUTPUT
        //     ? DragLinkDirection.FORWARD
        //     : DragLinkDirection.BACKWARD,
      });
    },
    [action, id]
  );

  useLayoutEffect(() => {
    ref.current?.addEventListener("mousedown", (ev) =>
      ev.stopImmediatePropagation()
    );
  }, []);

  return (
    <div ref={ref} onClick={onClick} style={style}>
      {children}
    </div>
  );
});
