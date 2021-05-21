import { FunctionComponent, memo } from "react";
import { SchemaActionType } from "src/functions";
import { useDrag, useSchema, useSchemaAction } from "src/hooks";
import { PortAlign, SchemaNode, SchemaPort } from "src/types";

const Port: FunctionComponent<{ port: SchemaPort }> = memo(({ port }) => {
  const { id } = port;
  return (
    <div
      className="Port"
      style={{
        width: "1rem",
        height: "1rem",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id={`GATE_${id}`}
        className="Gate"
        style={{ width: 2, height: 2, background: "black" }}
      />
    </div>
  );
});

const InputOutput: FunctionComponent<{ port: SchemaPort; align: PortAlign }> =
  memo(({ align, port }) => {
    return (
      <div
        className="InputOutput"
        style={{
          background: "red",
          flex: 1,
          display: "flex",
          justifyContent: align === PortAlign.LEFT ? "flex-start" : "flex-end",
        }}
      >
        <Port port={port} />
      </div>
    );
  });

export const DiagramNode: FunctionComponent<{
  node: SchemaNode;
}> = memo(({ node }) => {
  const { position, outputs, inputs, id } = node;
  const [left, top] = position;
  const action = useSchemaAction();
  const { scale } = useSchema();
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
      <div>title</div>
      <div
        className="io"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="Inputs"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {inputs?.map((input) => (
            <InputOutput key={input.id} port={input} align={PortAlign.LEFT} />
          ))}
        </div>
        <div
          className="Outputs"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {outputs?.map((output) => (
            <InputOutput
              key={output.id}
              port={output}
              align={PortAlign.RIGHT}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
