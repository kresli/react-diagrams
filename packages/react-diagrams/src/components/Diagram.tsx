import { FunctionComponent, memo, useEffect, useMemo } from "react";
import { Canvas } from "./Canvas";
import { Ctx, useContextMenu } from "../hooks";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { SchemaProvider } from "../components";
import React from "react";
import { ElementType, Schema, SchemaNode } from "../types";

type ContextMenuElement =
  | { type: ElementType.CANVAS }
  | {
      type: ElementType.NODE;
      node: SchemaNode;
    }
  | {
      type: ElementType.PORT;
    }
  | {
      type: ElementType.LINK;
    };

export interface ContextMenuProps {
  worldX: number;
  worldY: number;
  element: ContextMenuElement;
}

export type DiagramContextMenu = FunctionComponent<ContextMenuProps>;

interface Props {
  schema: Ctx;
  contextMenu?: DiagramContextMenu;
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

const useCtxMenu = (schema: Ctx, ContextMenuContent?: DiagramContextMenu) => {
  const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu();
  const { canvas, clientToNode, elementsFromPoint, clientToLocalPosition } =
    schema;
  useEffect(() => {
    setContextTrigger(canvas);
  }, [canvas, setContextTrigger]);
  return useMemo(() => {
    if (!ContextMenuContent || !contextPosition) return null;
    const [clientX, clientY] = contextPosition;
    const [type] = elementsFromPoint(clientX, clientY);
    const [worldX, worldY] = clientToLocalPosition(...contextPosition);
    const getElement = (): ContextMenuElement | null => {
      switch (type) {
        case ElementType.CANVAS:
          return { type };
        case ElementType.PORT:
          return { type };
        case ElementType.LINK:
          return { type };
        case ElementType.NODE:
          return {
            type,
            node: clientToNode(clientX, clientY)[0],
          };
        default:
          return null;
      }
    };
    const element = getElement();
    if (!element) return null;
    return (
      <ContextMenu>
        <ContextMenuContent element={element} worldX={worldX} worldY={worldY} />
      </ContextMenu>
    );
  }, [
    ContextMenu,
    ContextMenuContent,
    clientToLocalPosition,
    clientToNode,
    contextPosition,
    elementsFromPoint,
  ]);
};

export const Diagram: FunctionComponent<Props> = memo(
  ({ schema, contextMenu }) => {
    const ContextMenu = useCtxMenu(schema, contextMenu);
    return (
      <ThemeProvider theme={theme}>
        <SchemaProvider schema={schema}>
          <Canvas />
          {ContextMenu}
        </SchemaProvider>
      </ThemeProvider>
    );
  }
);
