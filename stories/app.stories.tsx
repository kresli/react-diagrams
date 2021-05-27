import { Meta } from "@storybook/react";
import { Diagram, DiagramNodeRender, Schema, useSchema } from "../src";
import { useContextMenu } from "./useContextMenu";
import { ContextPopup } from "./ContextPopup";
import { memo, useMemo } from "react";
import { ElementType } from "../src/functions/getElementType";

const meta: Meta = {
  title: "default",
  component: Diagram,
};

const CustomNode: DiagramNodeRender = memo(({ inputs, outputs, data }) => {
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
});

const initData: Schema = {
  nodes: [
    {
      id: "1",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1" }],
      // render: CustomNode,
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
  const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu();
  const setRef = (elem: HTMLDivElement) => setContextTrigger(elem);
  const onAdd = () => {
    if (!contextPosition) return;
    const position = schema.clientToLocalPosition(...contextPosition);
    schema.addNode({ position });
  };

  const { elementsFromPoint } = schema;
  const contextTypes = useMemo(() => {
    if (!contextPosition) return null;
    const [clientX, clientY] = contextPosition;
    return elementsFromPoint(clientX, clientY);
  }, [contextPosition, elementsFromPoint]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ display: "flex", flex: 1, height: "100%" }}>
        <Diagram schema={schema} ref={setRef} />
        <ContextMenu>
          <ContextPopup onAddNode={onAdd} contextTypes={contextTypes} />
        </ContextMenu>
      </div>
    </div>
  );
};

export default meta;
