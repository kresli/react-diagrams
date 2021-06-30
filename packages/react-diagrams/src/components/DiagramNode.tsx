import {
  FunctionComponent,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { NodeRenderDefault } from ".";
import { useContextMenu, useDrag, useRegElement } from "../hooks";
import { ElementType, SchemaNode } from "../types";
import { DiagramContextMenu } from "./Diagram";

interface Props {
  node: SchemaNode;
  onMove: (node: SchemaNode, movementX: number, movementY: number) => void;
  recalculatePortsPosition: (node: SchemaNode) => void;
  nodeContextMenu: DiagramContextMenu;
}

export const DiagramNode: FunctionComponent<Props> = memo(
  ({
    node,
    onMove,
    recalculatePortsPosition,
    nodeContextMenu: NodeContextMenu,
  }) => {
    const { position, id, render } = node;
    const [left, top] = position;
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const Render = useMemo(() => render || NodeRenderDefault, [render]);
    const [dragHolder, setDragHolder] = useState<HTMLElement | null>(null);
    useDrag(
      dragHolder,
      useCallback(
        (movementX, movementY) => {
          onMove(node, movementX, movementY);
        },
        [node, onMove]
      )
    );
    useLayoutEffect(() => {
      recalculatePortsPosition(node);
    });
    useRegElement(ref, ElementType.NODE, id);
    const ContextMenu = useContextMenu(ref, NodeContextMenu);
    return (
      <div
        className="DiagramNode"
        style={{
          position: "absolute",
          left,
          top,
          cursor: "default",
        }}
        ref={setRef}
      >
        <Render key={id} {...node} registerDragHolder={setDragHolder} />
        <ContextMenu />
        {/* <ContextMenu> */}
        {/* {(clientX, clientY, schema) => (
            <NodeContextMenu
              clientX={clientX}
              clientY={clientY}
              schema={schema}
            />
          )} */}
        {/* </ContextMenu> */}
      </div>
    );
  }
);
