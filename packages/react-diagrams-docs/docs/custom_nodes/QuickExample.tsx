import React, { memo, useMemo } from "react";
import { CSSProperties } from "styled-components";
import {
  createSchema,
  Diagram,
  DiagramNodeRender,
  Gate,
  Port,
  Schema,
  useSchema,
} from "@kresli/react-diagrams";

const CustomNode: DiagramNodeRender = memo(({ outputs }) => {
  const nodeStyle: CSSProperties = useMemo(
    () => ({
      background: "white",
      borderRadius: "100%",
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    }),
    []
  );
  const portStyle: CSSProperties = useMemo(
    () => ({
      width: 20,
      height: 20,
      background: "red",
      left: 110,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    }),
    []
  );
  return (
    <div style={nodeStyle}>
      <div>Custom Node</div>
      <div>
        {outputs?.map((output) => (
          <Port key={output.id} port={output} style={portStyle}>
            <Gate port={output} />
          </Port>
        ))}
      </div>
    </div>
  );
});

const initData = createSchema({
  nodes: [
    {
      id: "1",
      position: [100, 100],
      outputs: [{ id: "1" }],
      render: CustomNode,
    },
    {
      id: "3",
      position: [400, 400],
      inputs: [{ id: "3" }],
    },
  ],
  links: [
    {
      input: "3",
      output: "1",
    },
  ],
  position: [0, 0],
  scale: 1,
});

const Example = () => {
  const schema = useSchema(initData);
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Diagram schema={schema} />
    </div>
  );
};

export default Example;
