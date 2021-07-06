import {
  Schema,
  useSchema,
  Diagram,
  createSchema,
} from "@kresli/react-diagrams";
import React from "react";

const initialSchema: Schema = createSchema({
  nodes: [
    {
      id: "node_a",
      label: "Node A",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1", label: "Out" }],
    },
    {
      id: "node_b",
      label: "Node B",
      position: [400, 400] as [number, number],
      inputs: [{ id: "3", label: "In" }],
    },
  ],
  links: [
    {
      input: "3",
      output: "1",
    },
  ],
  position: [0, 0] as [number, number],
  scale: 1,
});

const DiagramQuickExample = () => {
  const schema = useSchema(initialSchema);
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Diagram schema={schema} />
    </div>
  );
};

export default DiagramQuickExample;
