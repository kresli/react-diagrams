import {
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { Ctx } from "../hooks";
import {
  DiagramCanvas,
  LinksCanvas,
  NodesCanvas,
  NodeContextMenuDefault,
  CanvasContextMenuDefault,
  SchemaProvider,
} from "../components";

export interface ContextMenuProps {
  clientX: number;
  clientY: number;
  onClose: () => void;
}

export type DiagramContextMenu = FunctionComponent<ContextMenuProps>;

interface Props {
  schema: Ctx;
}

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
    <SchemaProvider schema={schema}>
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
    </SchemaProvider>
  );
});
