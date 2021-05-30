import { FunctionComponent, memo, useContext, useMemo } from "react";
import { DiagramNode } from "../components";
import { NodesContext } from "../context";

export const NodesLayer: FunctionComponent = memo(() => {
  const nodesData = useContext(NodesContext);
  const nodes = useMemo(
    () => nodesData.map((node) => <DiagramNode key={node.id} node={node} />),
    [nodesData]
  );
  return (
    <div className="nodesLayer" style={{ position: "absolute" }}>
      {nodes}
    </div>
  );
});
