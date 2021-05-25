import { FunctionComponent, memo } from "react";
import { PortAlign, RenderProps, SchemaPort } from "../types";

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

const InputOutput: FunctionComponent<{
  port: SchemaPort;
  align: PortAlign;
}> = memo(({ align, port }) => {
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

export const NodeRenderDefault: FunctionComponent<RenderProps> = memo(
  ({ inputs, outputs }) => {
    return (
      <div>
        <div style={{ padding: "1rem" }}>title</div>
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
  }
);
