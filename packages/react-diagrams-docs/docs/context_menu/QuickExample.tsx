import React, { useCallback, useState } from "react";
import {
  Diagram,
  Schema,
  useSchema,
  createSchema,
  DiagramOnContextType,
} from "@kresli/react-diagrams";

const initData: Schema = createSchema({
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
      input: "3",
      output: "1",
    },
  ],
});

const Example = () => {
  const schema = useSchema(initData);
  const [contextPosition, setContextPosition] =
    useState<string>("No context menu");
  const onContextMenu: DiagramOnContextType = useCallback(
    ({ clientX, clientY, type }) => {
      setContextPosition(`context menu "${type}" on [${clientX}, ${clientY}]`);
    },
    []
  );
  return (
    <div style={{ width: "100%", height: 500, position: "relative" }}>
      <Diagram schema={schema} onContextMenu={onContextMenu} />
      {contextPosition && (
        <div style={{ position: "absolute", top: 0 }}>{contextPosition}</div>
      )}
    </div>
  );
};

export default Example;
