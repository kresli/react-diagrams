import {
  memo,
  FunctionComponent,
  useState,
  useMemo,
  CSSProperties,
} from "react";
import styled from "styled-components";
import { useDrag, useWheel } from "../hooks";
import { useContextMenu } from "../hooks/useContextMenu";
import { DiagramContextMenu } from "./Diagram";

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

interface Props {
  onCanvasMove: (movementX: number, movementY: number) => void;
  onCanvasZoom: (ev: WheelEvent) => void;
  onContextMenu: (ev: MouseEvent) => void;
  worldX: number;
  worldY: number;
  scale: number;
  registerWorldRef: (element: HTMLElement | null) => void;
}

const World = styled.div<{ scale: number; worldX: number; worldY: number }>(
  ({ scale, worldX, worldY }) => ({
    position: "absolute",
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    left: worldX,
    top: worldY,
  })
);

export const DiagramCanvas: FunctionComponent<Props> = memo(
  ({
    children,
    onCanvasMove,
    onCanvasZoom,
    onContextMenu,
    worldX,
    worldY,
    scale,
    registerWorldRef,
  }) => {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    useDrag(ref, onCanvasMove);
    useWheel(ref, onCanvasZoom);
    // useContextMenu(ref, CanvasContextMenuContent);
    useContextMenu(ref, onContextMenu);
    return (
      <DiagramRoot className="Diagram" data-testid="canvas" ref={setRef}>
        <World
          ref={registerWorldRef}
          worldX={worldX}
          worldY={worldY}
          scale={scale}
        >
          {children}
        </World>
        {/* <ContextMenu /> */}
      </DiagramRoot>
    );
  }
);
