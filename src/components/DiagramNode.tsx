import { FunctionComponent, memo, useMemo } from "react";
import { NodeRenderDefault } from ".";
import { SchemaActionType } from "../functions/schema.reducer";
import { useAction, useData, useDrag } from "../hooks";
import { SchemaNode } from "../types";

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
    const setRef = useDrag((movementX, movementY) =>
      action({
        type: SchemaActionType.NODE_MOVE,
        node,
        movementX,
        movementY,
        scale,
      })
    );
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
    return (
      <div
        data-node={id}
        className="DiagramNode"
        ref={setRef}
        style={{
          position: "absolute",
          left,
          top,
          border: "1px solid black",
          cursor: "default",
        }}
      >
        <Render key={id} {...props} />
      </div>
    );
  }
);
