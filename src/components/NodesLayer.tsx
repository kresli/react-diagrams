import { FunctionComponent, memo, useMemo } from "react";
import { useSchema } from "src/hooks";
import { DiagramNode } from "src/components";

export const NodesLayer: FunctionComponent = memo(() => {
  const schema = useSchema();
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
