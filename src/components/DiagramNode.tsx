import { FunctionComponent, memo, useMemo } from "react";
import { NodeContentDefault } from ".";
import { SchemaActionType } from "../functions/schema.reducer";
import { useAction, useData, useDrag } from "../hooks";
import { SchemaNode, SchemaNodeRender } from "../types";
import { NodeContentCustom } from "./NodeContent.custom";

type CustomNodeProps = SchemaNode & { render: SchemaNodeRender };

export const DiagramNode: FunctionComponent<{ node: SchemaNode }> = memo(
  ({ node }) => {
    const { position, id } = node;
    const [left, top] = position;
    const action = useAction();
    const { scale } = useData();
    // const { setElementType } = useContext(MouseEventsContext);
    const setRef = useDrag((movementX, movementY) =>
      action({
        type: SchemaActionType.NODE_MOVE,
        node,
        movementX,
        movementY,
        scale,
      })
    );
    const content = useMemo(
      () =>
        node.render ? (
          <NodeContentCustom node={node as CustomNodeProps} />
        ) : (
          <NodeContentDefault node={node} />
        ),
      [node]
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
          background: "blue",
          width: "5rem",
          cursor: "default",
        }}
      >
        {content}
      </div>
    );
  }
);
