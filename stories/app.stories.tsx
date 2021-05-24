import React, { FunctionComponent, memo, useLayoutEffect, useRef } from "react";
import { Meta } from "@storybook/react";
import { Diagram, useSchema } from "../src";
import { useContextMenu } from "./useContextMenu";
import { SchemaActionType } from "../src/functions";

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
  const ref = useRef<HTMLDivElement>(null);
  const schema = useSchema(initData);
  //@ts-ignore
  // const [schema, { onChange, addNode }] = useSchema({
  //   nodes: [
  //     {
  //       id: "1",
  //       position: [100, 100],
  //       outputs: [{ id: "1" }],
  //     },
  //     {
  //       id: "3",
  //       position: [400, 400],
  //       inputs: [{ id: "3" }],
  //     },
  //   ],
  //   links: [{ input: "1", output: "3" }],
  //   position: [0, 0],
  //   scale: 1,
  // });
  const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu(
    ContextPopup
  );
  useLayoutEffect(() => {
    setContextTrigger(ref.current);
  }, [setContextTrigger]);
  const onAdd = () => {
    if (!contextPosition) return;
    const position = schema.clientToLocalPosition(...contextPosition);
    schema.dispatchAction({ type: SchemaActionType.ADD_NODE, position });
  };
  // cosnt [schema, setSchema]

  return (
    <div style={{ width: 500, height: 500 }}>
      <Diagram schema={schema} ref={ref} />
      <ContextMenu onAddNode={onAdd} />
    </div>
  );
};

export default meta;
