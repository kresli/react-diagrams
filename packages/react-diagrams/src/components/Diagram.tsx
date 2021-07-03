import {
  createContext,
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Ctx } from "../hooks";
import {
  DiagramCanvas,
  LinksCanvas,
  NodesCanvas,
  NodeContextMenuDefault,
  CanvasContextMenuDefault,
} from "../components";
import { SchemaActionContext } from "../context";

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  onClose: () => void;
}

export type DiagramContextMenu = FunctionComponent<ContextMenuProps>;

interface Props {
  schema: Ctx;
}

const useUtilsContext = (schema: Ctx) =>
  useMemo(
    () => ({
      clientToNode: schema.clientToNode,
      clientToWorldPosition: schema.clientToLocalPosition,
    }),
    [schema.clientToLocalPosition, schema.clientToNode]
  );

const UtilsContext = createContext<ReturnType<typeof useUtilsContext>>(
  null as any
);

export const useUtils = () => useContext(UtilsContext);

export const Diagram: FunctionComponent<Props> = memo(({ schema }) => {
  const {
    nodes,
    links,
    scale,
    position,
    dragLink,
    setViewRef,
    moveNode,
    moveCanvas,
    zoomCanvas,
    portNodePosition,
    recalculatePortsPosition,
  } = schema;

  // @ts-ignore
  window.$diagram = schema;

  const [worldX, worldY] = position;
  const [contextMenu, setContextMenu] = useState<ReactNode | null>(null);
  const utils = useUtilsContext(schema);

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
          <LinksCanvas
            links={links}
            portNodePosition={portNodePosition}
            dragLink={dragLink}
          />
          {contextMenu}
        </DiagramCanvas>
      </SchemaActionContext.Provider>
    </UtilsContext.Provider>
  );
});
