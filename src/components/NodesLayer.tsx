import { FunctionComponent, memo, useMemo } from "react";
import { useData } from "../hooks";
import { DiagramNode } from "../components";

export const NodesLayer: FunctionComponent = memo(() => {
  const schema = useData();
  const nodes = useMemo(
    () => schema.nodes.map((node) => <DiagramNode key={node.id} node={node} />),
    [schema.nodes]
  );
  return (
    <div className="nodesLayer" style={{ position: "absolute" }}>
      {nodes}
    </div>
  );
});
