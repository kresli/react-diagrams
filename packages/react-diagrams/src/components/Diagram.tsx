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

export enum OnContextTypeDataType {
  NODE = "NODE",
  CANVAS = "CANVAS",
}

export type DiagramOnContextType = (data: {
  clientX: number;
  clientY: number;
  type: OnContextTypeDataType;
}) => void;

interface Props {
  schema: Ctx;
  onContextMenu?: DiagramOnContextType;
}

export const Diagram: FunctionComponent<Props> = memo(
  ({ schema, onContextMenu }) => {
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

    const [worldX, worldY] = position;
    const [contextMenu, setContextMenu] = useState<ReactNode | null>(null);

    const onNodeContextMenu = useCallback(
      ({ clientX, clientY }: MouseEvent) => {
        if (onContextMenu) {
          onContextMenu({ clientX, clientY, type: OnContextTypeDataType.NODE });
          return;
        }
        setContextMenu(
          <NodeContextMenuDefault
            clientX={clientX}
            clientY={clientY}
            onClose={() => setContextMenu(null)}
          />
        );
      },
      [onContextMenu]
    );

    const onCanvasContextMenu = useCallback(
      ({ clientX, clientY }: MouseEvent) => {
        if (onContextMenu) {
          onContextMenu({
            clientX,
            clientY,
            type: OnContextTypeDataType.CANVAS,
          });
          return;
        }
        setContextMenu(
          <CanvasContextMenuDefault
            clientX={clientX}
            clientY={clientY}
            onClose={() => setContextMenu(null)}
          />
        );
      },
      [onContextMenu]
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
  }
);
