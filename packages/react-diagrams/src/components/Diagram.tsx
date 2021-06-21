import { FunctionComponent, memo, useEffect, useMemo } from "react";
import { Canvas } from "./Canvas";
import { Ctx, useContextMenu } from "../hooks";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { ContextPopup, SchemaProvider } from "../components";
import { v4 } from "uuid";
import React from "react";
import { ElementType, SchemaNode } from "../types";

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

export const Diagram = memo<Props>(
  ({ schema, contextMenu: ContextMenuContent }) => {
    const { canvas } = schema;
    const {
      ContextMenu,
      setContextTrigger,
      contextPosition,
    } = useContextMenu();

    useEffect(() => {
      setContextTrigger(canvas);
    }, [canvas, setContextTrigger]);

    const contextMenu = useMemo(() => {
      if (!ContextMenuContent || !contextPosition) return null;
      const [clientX, clientY] = contextPosition;
      const [type] = schema.elementsFromPoint(clientX, clientY);
      const [worldX, worldY] = schema.clientToLocalPosition(...contextPosition);
      const getElement = (): ContextMenuElement => {
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
              node: schema.clientToNode(clientX, clientY)[0],
            };
          default:
            throw new Error("element not in case");
        }
      };
      return (
        <ContextMenu>
          <ContextMenuContent
            element={getElement()}
            worldX={worldX}
            worldY={worldY}
          />
        </ContextMenu>
      );
    }, [ContextMenu, ContextMenuContent, contextPosition, schema]);
    return (
      <ThemeProvider theme={theme}>
        <SchemaProvider schema={schema}>
          <Canvas />
          {contextMenu}
        </SchemaProvider>
        {/* <ContextMenu>
        <ContextPopup
          onAddNode={onAddNode}
          contextTypes={contextTypes}
          onRemoveNode={onRemoveNode}
        />
      </ContextMenu> */}
      </ThemeProvider>
    );
  }
);
