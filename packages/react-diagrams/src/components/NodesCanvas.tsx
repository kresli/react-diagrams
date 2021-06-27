import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramNode } from ".";
import { NodesContext } from "../context";
import React from "react";
import { SchemaNode } from "../types";

interface Props {
  nodes: SchemaNode[];
  onNodeMove: (node: SchemaNode, movementX: number, movementY: number) => void;
}

export const NodesCanvas: FunctionComponent<Props> = memo(
  ({ nodes, onNodeMove }) => {
    // const { zIndex } = useTheme();
    const renderNodes = useMemo(
      () =>
        nodes.map((node) => (
          <DiagramNode key={node.id} node={node} onMove={onNodeMove} />
        )),
      [nodes, onNodeMove]
    );
    return (
      <div className="nodesLayer" style={{ position: "absolute" }}>
        {renderNodes}
      </div>
    );
  }
);
