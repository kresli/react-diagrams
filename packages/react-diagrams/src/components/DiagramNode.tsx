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
import { NodeRenderDefault } from ".";
import { useDrag, useRegElement } from "../hooks";
import { useContextMenu } from "../hooks/useContextMenu";
import { ElementType, SchemaNode } from "../types";
import { DiagramContextMenu } from "./Diagram";

interface Props {
  node: SchemaNode;
  onMove: (node: SchemaNode, movementX: number, movementY: number) => void;
  recalculatePortsPosition: (node: SchemaNode) => void;
  // nodeContextMenu: DiagramContextMenu;
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
  ({
    node,
    onMove,
    recalculatePortsPosition,
    // nodeContextMenu: NodeContextMenu,
    onContextMenu,
  }) => {
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
    // useContextMenu(ref, NodeContextMenu);
    useContextMenu(
      ref,
      useCallback((ev) => onContextMenu(ev, node), [node, onContextMenu])
    );
    // useEffect(() => {
    //   const context = (ev: MouseEvent) => {
    //     ev.stopImmediatePropagation();
    //     ev.preventDefault();
    //     onContextMenu(ev, node);
    //   };
    //   ref?.addEventListener("contextmenu", context);
    //   return () => ref?.removeEventListener("contextmenu", context);
    // }, [node, onContextMenu, ref]);
    return (
      <DiagramNodeRoot ref={setRef} left={left} top={top}>
        <Render key={id} {...node} registerDragHolder={setDragHolder} />
        {/* <ContextMenu> */}
        {/* {(clientX, clientY, schema) => (
            <NodeContextMenu
              clientX={clientX}
              clientY={clientY}
              schema={schema}
            />
          )} */}
        {/* </ContextMenu> */}
      </DiagramNodeRoot>
    );
  }
);
