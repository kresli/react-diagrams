import { Meta } from "@storybook/react";
import { Diagram, Schema, SchemaNode, useSchema } from "../src";
import { useContextMenu } from "./useContextMenu";
import { ContextPopup } from "./ContextPopup";
import { v4 } from "uuid";

const meta: Meta = {
  title: "default",
  component: Diagram,
};

const initData: Schema = {
  nodes: [
    {
      id: "1",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1" }],
      render: ({ inputs, outputs, data }) => {
        return (
          <div>
            <div>custom</div>
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
      },
    },
    {
      id: "3",
      position: [400, 400] as [number, number],
      inputs: [{ id: "3" }],
    },
  ],
  links: [{ input: "1", output: "3" }],
  position: [0, 0] as [number, number],
  scale: 1,
};

// function createTemplate<T extends Partial<SchemaNode>>(node: T): () => T {
//   return () => ({
//     id: v4(),
//     position: [0,0],
//     ...node
//   })
// }

// const TEMPLATES = {
//   DEFAULT: createTemplate({}),
//   CUSTOM: createTemplate({})
// }

export const Playground = () => {
  const schema = useSchema(initData);
  const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu(
    ContextPopup
  );
  const setRef = (elem: HTMLDivElement) => setContextTrigger(elem);
  const onAdd = () => {
    if (!contextPosition) return;
    const position = schema.clientToLocalPosition(...contextPosition);
    schema.addNode({ position });
  };

  return (
    <div style={{ width: 500, height: 500 }}>
      <Diagram schema={schema} ref={setRef} />
      <ContextMenu onAddNode={onAdd} />
    </div>
  );
};

export default meta;
