import { memo, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAction, useDrag, useRegisterElement, useWheel } from "../hooks";
import { ElementType } from "../types";
import { ViewLayer } from "../components";
import { SchemaActionType } from "../functions";
import React from "react";

const DiagramRoot = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.28581;
  text-transform: none;
  color: #182026;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  position: relative;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Canvas = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const action = useAction();
  useRegisterElement(ref, ElementType.CANVAS);
  useDrag(
    ref,
    useCallback(
      (movementX, movementY) => {
        action({
          type: SchemaActionType.VIEWPORT_MOVE,
          movementX,
          movementY,
        });
      },
      [action]
    )
  );
  useWheel(
    ref,
    useCallback(
      (ev) => {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        const { clientX, clientY, deltaY } = ev;
        action({
          type: SchemaActionType.VIEWPORT_ZOOM,
          clientX,
          clientY,
          deltaY,
        });
      },
      [action]
    )
  );
  return (
    <DiagramRoot className="Diagram" data-testid="canvas" ref={ref}>
      <ViewLayer />
    </DiagramRoot>
  );
});
