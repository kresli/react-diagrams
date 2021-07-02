import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { NodeRenderDefault } from "../components";
import { useDrag, useRegElement, useContextMenu } from "../hooks";
import { NODE } from "../testIds";
import { ElementType, SchemaNode } from "../types";

interface Props {
  node: SchemaNode;
  onMove: (node: SchemaNode, movementX: number, movementY: number) => void;
  recalculatePortsPosition: (node: SchemaNode) => void;
  onContextMenu: (ev: MouseEvent, node: SchemaNode) => void;
}

const DiagramNodeRoot = styled.div<{ left: number; top: number }>(
  ({ left, top }) => ({
    position: "absolute",
    left,
    top,
    cursor: "default",
  })
);

export const DiagramNode: FunctionComponent<Props> = memo(
  ({ node, onMove, recalculatePortsPosition, onContextMenu }) => {
    const { position, id, render } = node;
    const [left, top] = position;
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const Render = useMemo(() => render || NodeRenderDefault, [render]);
    const [dragHolder, setDragHolder] = useState<HTMLElement | null>(null);
    const onDrag = useCallback(
      (movementX, movementY) => {
        onMove(node, movementX, movementY);
      },
      [node, onMove]
    );
    useDrag(dragHolder, onDrag);
    useLayoutEffect(() => {
      recalculatePortsPosition(node);
    });
    useRegElement(ref, ElementType.NODE, id);
    useContextMenu(
      ref,
      useCallback((ev) => onContextMenu(ev, node), [node, onContextMenu])
    );
    useEffect(() => {
      const onMouseDown = (ev: Event) => {
        ev.stopImmediatePropagation();
        ev.preventDefault();
      };
      ref?.addEventListener("mousedown", onMouseDown);
      return () => ref?.removeEventListener("mousedown", onMouseDown);
    }, [ref]);

    return (
      <DiagramNodeRoot
        data-testid={NODE(id)}
        ref={setRef}
        left={left}
        top={top}
      >
        <Render key={id} {...node} registerDragHolder={setDragHolder} />
      </DiagramNodeRoot>
    );
  }
);
