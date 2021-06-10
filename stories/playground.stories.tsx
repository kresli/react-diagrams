import { Diagram, DiagramNodeRender, Schema, useSchema } from "../src";
import { memo } from "react";

const CustomNode: DiagramNodeRender = memo(({ inputs, outputs, data }) => {
  return (
    <div style={{ background: "white" }}>
      <div>Custom Node</div>
      <div>
        {inputs?.map((input) => (
          <div key={input.id}>
            Input
            <div id={input.key} />
          </div>
        ))}
        {outputs?.map((output) => (
          <div key={output.id}>
            Output
            <div id={output.key} />
          </div>
        ))}
      </div>
    </div>
  );
});

const initData: Schema = {
  dragLink: null,
  registeredElements: new Map(),
  canvasRef: null,
  viewRef: null,
  nodes: [
    {
      id: "1",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1" }],
      render: CustomNode,
    },
    {
      id: "3",
      position: [400, 400] as [number, number],
      inputs: [{ id: "3" }],
    },
  ],
  links: [
    {
      input: "1",
      output: "3",
      // render: ({ input, output, start, end }) => (
      //   <line
      //     id={`LINK_${input}${output}`}
      //     x1={start[0]}
      //     y1={start[1]}
      //     x2={end[0]}
      //     y2={end[1]}
      //     stroke="yellow"
      //   />
      // ),
    },
  ],
  position: [0, 0] as [number, number],
  scale: 1,
};

export default { title: "Playground" };

export const Playground = () => {
  const schema = useSchema(initData);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ display: "flex", flex: 1, height: "100%" }}>
        <Diagram schema={schema} />
      </div>
    </div>
  );
};
