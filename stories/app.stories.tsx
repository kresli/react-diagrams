import React from "react";
import { Meta } from "@storybook/react";
import { Diagram, useSchema } from "../src";

const meta: Meta = {
  title: "default",
  component: Diagram,
};

export const Playground = () => {
  const [schema, { onChange }] = useSchema({
    nodes: [
      {
        id: "1",
        position: [100, 100],
        outputs: [{ id: "1" }],
      },
      {
        id: "3",
        position: [400, 400],
        inputs: [{ id: "3" }],
      },
    ],
    links: [{ input: "1", output: "3" }],
    position: [0, 0],
    scale: 1,
  });
  return (
    <div style={{ width: 500, height: 500 }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default meta;
