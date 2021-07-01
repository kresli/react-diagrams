import {
  createContext,
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { DiagramCanvas } from "./DiagramCanvas";
import { Ctx } from "../hooks";
import styled, { DefaultTheme } from "styled-components";
import { LinksCanvas, NodesCanvas } from "../components";
import {
  CanvasContextMenuDefault,
  NodeContextMenuDefault,
} from "./DiagramContextMenu.default";
import { SchemaActionContext } from "../context";

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  onClose: () => void;
}

export type DiagramContextMenu = FunctionComponent<ContextMenuProps>;

interface Props {
  schema: Ctx;
  // canvasContextMenu: DiagramContextMenu;
  nodeContextMenu: DiagramContextMenu;
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

const useUtilsContext = (schema: Ctx) =>
  useRef({
    clientToNode: schema.clientToNode,
  });

const UtilsContext = createContext<ReturnType<typeof useUtilsContext>>(
  null as any
);

export const useUtils = () => useContext(UtilsContext).current;

export const Diagram: FunctionComponent<Props> = memo(({ schema }) => {
  const {
    nodes,
    links,
    scale,
    position,
    setViewRef,
    moveNode,
    moveCanvas,
    zoomCanvas,
    portNodePosition,
    recalculatePortsPosition,
  } = schema;
  const [worldX, worldY] = position;
  const utils = useUtilsContext(schema);
  // const contextMenuState = useState<FunctionComponent | null>(null);
  // const [ContextMenu] = contextMenuState;
  const [contextMenu, setContextMenu] = useState<ReactNode | null>(null);

  const onNodeContextMenu = useCallback(
    ({ clientX, clientY }: MouseEvent) =>
      setContextMenu(
        <NodeContextMenuDefault
          clientX={clientX}
          clientY={clientY}
          onClose={() => setContextMenu(null)}
        />
      ),
    []
  );

  const onCanvasContextMenu = useCallback(
    ({ clientX, clientY }: MouseEvent) =>
      setContextMenu(
        <CanvasContextMenuDefault
          clientX={clientX}
          clientY={clientY}
          onClose={() => setContextMenu(null)}
        />
      ),
    []
  );

  return (
    <UtilsContext.Provider value={utils}>
      <SchemaActionContext.Provider value={schema.action}>
        <DiagramCanvas
          onCanvasMove={moveCanvas}
          onCanvasZoom={zoomCanvas}
          onContextMenu={onCanvasContextMenu}
          worldX={worldX}
          worldY={worldY}
          scale={scale}
          registerWorldRef={setViewRef}
        >
          <NodesCanvas
            nodes={nodes}
            onNodeMove={moveNode}
            recalculatePortsPosition={recalculatePortsPosition}
            onNodeContextMenu={onNodeContextMenu}
          />
          <LinksCanvas links={links} portNodePosition={portNodePosition} />
          {/* {ContextMenu} */}
          {contextMenu}
        </DiagramCanvas>
      </SchemaActionContext.Provider>
    </UtilsContext.Provider>
  );
  // return (
  //   <ThemeProvider theme={theme}>
  //     <SchemaProvider schema={schema}>
  //       <DiagramCanvas>
  //         <NodesCanvas />
  //         <LinksCanvas />
  //       {ContextMenu}
  //       </DiagramCanvas>
  //     </SchemaProvider>
  //   </ThemeProvider>
  // );
});
