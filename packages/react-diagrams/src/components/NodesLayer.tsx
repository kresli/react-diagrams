import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramNode } from "../components";
import { NodesContext } from "../context";
import React from "react";

export const NodesLayer: FunctionComponent = memo(() => {
  const { zIndex } = useTheme();
  const nodesData = useContext(NodesContext);
  const nodes = useMemo(
    () => nodesData.map((node) => <DiagramNode key={node.id} node={node} />),
    [nodesData]
  );
  return (
    <div
      className="nodesLayer"
      style={{ position: "absolute", zIndex: zIndex.nodesLayer }}
    >
      {nodes}
    </div>
  );
});
