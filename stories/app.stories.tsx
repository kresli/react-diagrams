import React, {
  FunctionComponent,
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { Meta } from "@storybook/react";
import { Diagram, useSchema } from "../src";
import { useContextMenu } from "./useContextMenu";

const meta: Meta = {
  title: "default",
  component: Diagram,
};

const ContextPopup: FunctionComponent<{
  onAddNode: (data: { position: [number, number] }) => void;
}> = memo(() => {
  const handleCreate = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      console.log("add node??");
    },
    []
  );
  return (
    <div>
      <button onClick={handleCreate}>create</button>
    </div>
  );
});

export const Playground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [schema, { onChange, addNode }] = useSchema({
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
  const { ContextMenu, setContextTrigger } = useContextMenu(ContextPopup);
  const x = useCallback(
    (d: any) => {
      console.log(d);
      onChange(d);
    },
    [onChange]
  );
  useLayoutEffect(() => {
    setContextTrigger(ref.current);
  }, [setContextTrigger]);
  return (
    <div style={{ width: 500, height: 500 }}>
      <Diagram schema={schema} onChange={x} ref={ref} />
      <ContextMenu onAddNode={addNode} />
    </div>
  );
};

export default meta;
