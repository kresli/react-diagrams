import {
  FunctionComponent,
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { NodeRenderDefault } from ".";
import { SchemaActionType } from "../functions/schema.reducer";
import { useAction, useData, useDrag } from "../hooks";
import { ElementType, SchemaNode } from "../types";
import { useRegisterElement } from "../hooks";
export const DiagramNode: FunctionComponent<{ node: SchemaNode }> = memo(
  ({ node: nodeData }) => {
    const node = useMemo(
      () => ({
        render: NodeRenderDefault,
        ...nodeData,
      }),
      [nodeData]
    );
    const { position, id, inputs, outputs, data } = node;
    const [left, top] = position;
    const action = useAction();
    const { scale } = useData();
    const ref = useRef<HTMLDivElement | null>(null);
    const setDragRef = useDrag((movementX, movementY) =>
      action({
        type: SchemaActionType.NODE_MOVE,
        node,
        movementX,
        movementY,
        scale,
      })
    );
    useLayoutEffect(() => {
      setDragRef(ref.current);
    }, [setDragRef]);
    const Render = node.render;
    const props = useMemo(
      () => ({
        inputs: inputs?.map((input) => ({
          ...input,
          key: `GATE_${input.id}`,
        })),
        outputs: outputs?.map((output) => ({
          ...output,
          key: `GATE_${output.id}`,
        })),
        data: data,
      }),
      [data, inputs, outputs]
    );

    useRegisterElement(ref, ElementType.NODE, node);

    return (
      <div
        className="DiagramNode"
        ref={ref}
        style={{
          position: "absolute",
          left,
          top,
          cursor: "default",
        }}
      >
        <Render key={id} {...props} />
      </div>
    );
  }
);
