import {
  Schema,
  useSchema,
  Diagram,
  Link,
  SchemaLinkRender,
} from "../../../src";
import React, { useMemo } from "react";

const CustomLink: SchemaLinkRender = ({ start, end }) => {
  const points = useMemo(() => {
    const [sx, sy] = start;
    const [ex, ey] = end;
    return `M${sx} ${sy} H${sx + 30} L${ex - 30} ${ey} ${ex} ${ey}`;
  }, [end, start]);
  return <Link d={points} stroke="blue" fill="none" />;
};

const initialSchema: Schema = {
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
      render: CustomLink,
    },
  ],
  position: [0, 0],
  scale: 1,
};

const DiagramQuickExample = () => {
  const schema = useSchema(initialSchema);
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Diagram schema={schema} />
    </div>
  );
};

export default DiagramQuickExample;
