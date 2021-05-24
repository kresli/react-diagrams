import { FunctionComponent, memo } from "react";
import { SchemaNode } from "..";
import { SchemaActionType } from "../functions";
import { useAction, useData, useDrag } from "../hooks";

export const DiagramNodeHolder: FunctionComponent<{ node: SchemaNode }> = memo(
  ({ node, children }) => {
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
        {children}
      </div>
    );
  }
);
