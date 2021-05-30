import { useAtom } from "custom-react-context-state";
import { FunctionComponent, memo, useMemo } from "react";
// import { useData } from "../hooks";
import { DiagramNode } from "../components";
import { NodesAtom } from "./atoms";

export const NodesLayer: FunctionComponent = memo(() => {
  const [nodesData] = useAtom(NodesAtom);
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
