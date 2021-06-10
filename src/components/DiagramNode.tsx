import { FunctionComponent, memo, useCallback, useMemo, useRef } from "react";
import { NodeRenderDefault } from ".";
import { SchemaActionType } from "../functions/schema.reducer";
import { useAction, useDrag } from "../hooks";
import { ElementType, SchemaNode } from "../types";
import { useRegisterElement } from "../hooks";
export const DiagramNode: FunctionComponent<{ node: SchemaNode }> = memo(
  ({ node: nodeData }) => {
    const action = useAction();
    const node = useMemo(
      () => ({
        render: NodeRenderDefault,
        ...nodeData,
      }),
      [nodeData]
    );
    const { position, id, inputs, outputs, data } = node;
    const [left, top] = position;
    const ref = useRef<HTMLDivElement | null>(null);
    const Render = node.render;
    const props = useMemo(
      () => ({
        inputs: inputs?.map((input) => ({
          ...input,
          key: input.id,
        })),
        outputs: outputs?.map((output) => ({
          ...output,
          key: output.id,
        })),
        data: data,
      }),
      [data, inputs, outputs]
    );

    useRegisterElement(ref, ElementType.NODE, node.id);
    useDrag(
      ref,
      useCallback(
        (movementX, movementY) => {
          action({
            type: SchemaActionType.NODE_MOVE,
            movementX,
            movementY,
            node,
          });
        },
        [action, node]
      ),
      true
    );
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
