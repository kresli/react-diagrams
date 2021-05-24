import { FunctionComponent, memo } from "react";
import { PortAlign, SchemaNode } from "../types";
import { InputOutput } from ".";

export const DiagramNodeDefault: FunctionComponent<{
  node: SchemaNode;
}> = memo(({ node }) => {
  const { outputs, inputs } = node;
  return (
    <>
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
    </>
  );
});
