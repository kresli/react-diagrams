import { FunctionComponent, memo, useRef, useCallback } from "react";
import { SchemaPort, ElementType } from "../types";
import { SchemaActionType } from "../functions";
import { useAction, useRegisterElement } from "../hooks";
import { CSSProperties } from "styled-components";
import React from "react";

export const Port: FunctionComponent<{
  port: SchemaPort;
  style?: CSSProperties;
}> = memo(({ port, children, style }) => {
  // const { id } = port;
  // const action = useAction();
  const ref = useRef<HTMLDivElement | null>(null);
  // useRegisterElement(ref, ElementType.PORT, id);
  // const onClick = useCallback(
  //   ({ clientX, clientY }: React.MouseEvent) => {
  //     if (!ref.current) return;
  //     action({
  //       type: SchemaActionType.CREATE_DRAGGING_LINK,
  //       clientX,
  //       clientY,
  //       portId: id,
  //     });
  //   },
  //   [action, id]
  // );

  // useLayoutEffect(() => {
  //   ref.current?.addEventListener("mousedown", (ev) =>
  //     ev.stopImmediatePropagation()
  //   );
  // }, []);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
});
