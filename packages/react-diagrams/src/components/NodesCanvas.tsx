import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramNode } from ".";
import { NodesContext } from "../context";
import React from "react";
import { SchemaNode } from "../types";
import { DiagramContextMenu } from "./Diagram";

interface Props {
  nodes: SchemaNode[];
  onNodeMove: (node: SchemaNode, movementX: number, movementY: number) => void;
  recalculatePortsPosition: (node: SchemaNode) => void;
  nodeContextMenu: DiagramContextMenu;
}

export const NodesCanvas: FunctionComponent<Props> = memo(
  ({ nodes, onNodeMove, recalculatePortsPosition, nodeContextMenu }) => {
    // const { zIndex } = useTheme();
    const renderNodes = useMemo(
      () =>
        nodes.map((node) => (
          <DiagramNode
            key={node.id}
            node={node}
            onMove={onNodeMove}
            recalculatePortsPosition={recalculatePortsPosition}
            nodeContextMenu={nodeContextMenu}
          />
        )),
      [nodeContextMenu, nodes, onNodeMove, recalculatePortsPosition]
    );
    return (
      <div className="nodesLayer" style={{ position: "absolute" }}>
        {renderNodes}
      </div>
    );
  }
);
