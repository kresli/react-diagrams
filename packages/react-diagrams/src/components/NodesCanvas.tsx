import { FunctionComponent, memo, useMemo } from "react";
import { DiagramNode } from "../components";
import React from "react";
import { DiagramContextMenu } from "./Diagram";
import { SchemaNode } from "../types";

interface Props {
  nodes: SchemaNode[];
  onNodeMove: (node: SchemaNode, movementX: number, movementY: number) => void;
  recalculatePortsPosition: (node: SchemaNode) => void;
  onNodeContextMenu: (ev: MouseEvent, node: SchemaNode) => void;
}

export const NodesCanvas: FunctionComponent<Props> = memo(
  ({ nodes, onNodeMove, recalculatePortsPosition, onNodeContextMenu }) => {
    // const { zIndex } = useTheme();
    const renderNodes = useMemo(
      () =>
        nodes.map((node) => (
          <DiagramNode
            key={node.id}
            node={node}
            onMove={onNodeMove}
            recalculatePortsPosition={recalculatePortsPosition}
            onContextMenu={onNodeContextMenu}
            // nodeContextMenu={nodeContextMenu}
          />
        )),
      [nodes, onNodeContextMenu, onNodeMove, recalculatePortsPosition]
    );
    return (
      <div className="nodesLayer" style={{ position: "absolute" }}>
        {renderNodes}
      </div>
    );
  }
);
