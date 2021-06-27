import {
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { NodeRenderDefault } from ".";
import { SchemaActionType } from "../functions/schema.reducer";
import { useAction, useDrag } from "../hooks";
import { ElementType, SchemaNode } from "../types";
import { useRegisterElement } from "../hooks";
import React from "react";
import { clientToWorldPosition } from "../functions";

interface Props {
  node: SchemaNode;
  onMove: (node: SchemaNode, movementX: number, movementY: number) => void;
}

export const DiagramNode: FunctionComponent<Props> = memo(
  ({ node, onMove: onPositionChange }) => {
    // const action = useAction();
    // const node = useMemo(
    //   () => ({
    //     render: NodeRenderDefault,
    //     ...nodeData,
    //   }),
    //   [nodeData]
    // );
    const { position, id, render } = node;
    const [left, top] = position;
    // const ref = useRef<HTMLDivElement | null>(null);
    // const Render = nodeData.render;
    // const props = useMemo(
    //   () => ({
    //     ...node,
    //     inputs: inputs?.map((input) => ({
    //       ...input,
    //       key: input.id,
    //     })),
    //     outputs: outputs?.map((output) => ({
    //       ...output,
    //       key: output.id,
    //     })),
    //     data: data,
    //   }),
    //   [data, inputs, outputs, node]
    // );

    // useRegisterElement(ref, ElementType.NODE, node.id);
    // useDrag(
    //   ref,
    //   useCallback(
    //     (movementX, movementY) => {
    //       action({
    //         type: SchemaActionType.NODE_MOVE,
    //         movementX,
    //         movementY,
    //         node,
    //       });
    //     },
    //     [action, node]
    //   )
    // );
    const Render = useMemo(() => render || NodeRenderDefault, [render]);
    const [dragHolder, setDragHolder] = useState<HTMLElement | null>(null);
    useDrag(
      dragHolder,
      useCallback(
        (movementX, movementY) => {
          onPositionChange(node, movementX, movementY);
        },
        [node, onPositionChange]
      )
    );
    return (
      <div
        className="DiagramNode"
        style={{
          position: "absolute",
          left,
          top,
          cursor: "default",
        }}
      >
        <Render key={id} {...node} registerDragHolder={setDragHolder} />
      </div>
    );
  }
);
