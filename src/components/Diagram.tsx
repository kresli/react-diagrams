import React, { memo, useEffect, useMemo } from "react";
import { Canvas } from "./Canvas";
import { Ctx, useContextMenu } from "../hooks";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { ContextPopup, SchemaProvider } from "../components";
import { v4 } from "uuid";

interface Props {
  schema: Ctx;
}

const theme: DefaultTheme = {
  zIndex: {
    linksLayer: 100,
    nodesLayer: 200,
  },
  node: {
    borderRadius: "4pt",
  },
};

export const Diagram = memo<Props>(({ schema }) => {
  const { canvas } = schema;
  const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu();
  const onAddNode = () => {
    if (!contextPosition) return;
    const position = schema.clientToLocalPosition(...contextPosition);
    schema.addNode({
      position,
      inputs: [{ id: v4() }],
      outputs: [{ id: v4() }],
    });
  };
  const onRemoveNode = () => {
    if (!contextPosition) return;
    const [node] = schema.clientToNode(...contextPosition);
    if (node) schema.removeNode(node);
  };

  const { elementsFromPoint } = schema;
  const contextTypes = useMemo(() => {
    if (!contextPosition) return null;
    const [clientX, clientY] = contextPosition;
    return elementsFromPoint(clientX, clientY);
  }, [contextPosition, elementsFromPoint]);

  useEffect(() => {
    setContextTrigger(canvas);
  }, [canvas, setContextTrigger]);
  return (
    <ThemeProvider theme={theme}>
      <SchemaProvider schema={schema}>
        <Canvas />
      </SchemaProvider>
      <ContextMenu>
        <ContextPopup
          onAddNode={onAddNode}
          contextTypes={contextTypes}
          onRemoveNode={onRemoveNode}
        />
      </ContextMenu>
    </ThemeProvider>
  );
});
