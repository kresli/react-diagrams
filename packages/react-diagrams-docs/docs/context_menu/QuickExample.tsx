import React from "react";
import {
  Diagram,
  DiagramContextMenu,
  ElementType,
  Schema,
  useSchema,
  useAction,
  SchemaActionType,
} from "@kresli/react-diagrams";

const initData: Schema = {
  dragLink: null,
  registeredElements: new Map(),
  canvasRef: null,
  viewRef: null,
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
  links: [
    {
      input: "1",
      output: "3",
    },
  ],
  position: [0, 0],
  scale: 1,
};

const ContextMenu: DiagramContextMenu = ({ element, worldX, worldY }) => {
  const actions = useAction();
  console.log(element);
  switch (element.type) {
    case ElementType.CANVAS:
      const onAdd = () =>
        actions({
          type: SchemaActionType.ADD_NODE,
          node: {
            position: [worldX, worldY],
            inputs: [{ id: `in${performance.now()}` }],
            outputs: [{ id: `out${performance.now()}` }],
          },
        });
      return <button onClick={onAdd}>create</button>;
    case ElementType.NODE: {
      const onRemoveNode = () =>
        actions({
          type: SchemaActionType.REMOVE_NODE,
          node: element.node,
        });
      return <button onClick={onRemoveNode}>remove node</button>;
    }
    case ElementType.PORT:
      return <div>port</div>;
    case ElementType.LINK:
      return <div>link</div>;
  }
  return null;
};

const Example = () => {
  const schema = useSchema(initData);
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Diagram schema={schema} contextMenu={ContextMenu} />
    </div>
  );
};

export default Example;
