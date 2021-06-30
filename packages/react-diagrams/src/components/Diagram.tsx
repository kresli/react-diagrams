import {
  createContext,
  FunctionComponent,
  memo,
  useContext,
  useMemo,
  useRef,
} from "react";
import { DiagramCanvas } from "./DiagramCanvas";
import { Ctx } from "../hooks";
import { DefaultTheme } from "styled-components";
import { LinksCanvas, NodesCanvas } from "../components";
import { Schema } from "../types";
import {
  CanvasContextMenuDefault,
  NodeContextMenuDefault,
} from "./DiagramContextMenu.default";
import { SchemaActionContext } from "../context";

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  // schema: Ctx;
}

export type DiagramContextMenu = FunctionComponent<ContextMenuProps>;

interface Props {
  schema: Ctx;
  canvasContextMenu: DiagramContextMenu;
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

// const useCtxMenu = (schema: Ctx, ContextMenuContent?: DiagramContextMenu) => {
//   const { ContextMenu, setContextTrigger, contextPosition } = useContextMenu();
//   const { canvas, clientToNode, elementsFromPoint, clientToLocalPosition } =
//     schema;
//   useEffect(() => {
//     setContextTrigger(canvas);
//   }, [canvas, setContextTrigger]);

//   return useMemo(() => {
//     if (!ContextMenuContent || !contextPosition) return null;
//     const [clientX, clientY] = contextPosition;
//     const [type] = elementsFromPoint(clientX, clientY);
//     const [worldX, worldY] = clientToLocalPosition(...contextPosition);
//     const getElement = (): ContextMenuElement | null => {
//       switch (type) {
//         case ElementType.CANVAS:
//           return { type };
//         case ElementType.PORT:
//           return { type };
//         case ElementType.LINK:
//           return { type };
//         case ElementType.NODE:
//           return {
//             type,
//             node: clientToNode(clientX, clientY)[0],
//           };
//         default:
//           return null;
//       }
//     };
//     const element = getElement();
//     if (!element) return null;
//     return (
//       <ContextMenu>
//         <ContextMenuContent element={element} worldX={worldX} worldY={worldY} />
//       </ContextMenu>
//     );
//   }, [
//     ContextMenu,
//     ContextMenuContent,
//     clientToLocalPosition,
//     clientToNode,
//     contextPosition,
//     elementsFromPoint,
//   ]);
// };

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

  // const CanvasContextMenu: DiagramContextMenu = useMemo(
  //   () =>
  //     ({ clientX, clientY }) =>
  //       <CanvasContextMenuDefault clientX={clientX} clientY={clientY} />,
  //   []
  // );

  // const NodeContextMenu: DiagramContextMenu = useMemo(
  //   () =>
  //     ({ clientX, clientY }) =>
  //       (
  //         <NodeContextMenuDefault
  //           clientX={clientX}
  //           clientY={clientY}
  //           clientToNode={clientToNode}
  //         />
  //       ),
  //   [clientToNode]
  // );

  return (
    <UtilsContext.Provider value={utils}>
      <SchemaActionContext.Provider value={schema.action}>
        <DiagramCanvas
          onCanvasMove={moveCanvas}
          onCanvasZoom={zoomCanvas}
          canvasContextMenu={CanvasContextMenuDefault}
          worldX={worldX}
          worldY={worldY}
          scale={scale}
          registerWorldRef={setViewRef}
        >
          <NodesCanvas
            nodes={nodes}
            onNodeMove={moveNode}
            recalculatePortsPosition={recalculatePortsPosition}
            nodeContextMenu={NodeContextMenuDefault}
          />
          <LinksCanvas links={links} portNodePosition={portNodePosition} />
          {/* {ContextMenu} */}
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
