import { FunctionComponent, memo } from "react";
import { SchemaPort, PortAlign } from "..";

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

export const InputOutput: FunctionComponent<{
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
