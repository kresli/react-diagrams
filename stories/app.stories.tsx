import React, { FunctionComponent, memo } from "react";
import { Meta } from "@storybook/react";
import { Diagram, useSchema } from "../src";
import { useContextMenu } from "./useContextMenu";

const meta: Meta = {
  title: "default",
  component: Diagram,
};

const ContextPopup: FunctionComponent<{
  onAddNode: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}> = memo(({ onAddNode }) => {
  return (
    <div>
      <button onClick={onAddNode}>create</button>
    </div>
  );
});

const initData = {
  nodes: [
    {
      id: "1",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1" }],
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
