import {
  FunctionComponent,
  memo,
  useState,
  CSSProperties,
  useCallback,
} from "react";
import { useViewport } from "src/context";
import { SchemaActionType } from "src/functions";
import { useSchemaAction, useDrag, useWheel, useContextMenu } from "src/hooks";
import { ViewLayer } from "src/components";

const ContextPopup: FunctionComponent = () => {
  const handleCreate = useCallback(() => {}, []);
  return (
    <div>
      <button onClick={handleCreate}>create</button>
    </div>
  );
};

export const Canvas: FunctionComponent = memo(() => {
  const { ContextMenu, setContextTrigger } = useContextMenu(ContextPopup);
  const action = useSchemaAction();
  const setDragRef = useDrag((movementX, movementY) =>
    action({ type: SchemaActionType.VIEWPORT_MOVE, movementX, movementY })
  );
  const [viewLayer] = useViewport();
  const setZoomRef = useWheel((data) => {
    if (viewLayer)
      action({ ...data, type: SchemaActionType.VIEWPORT_ZOOM, viewLayer });
  });
  const [style] = useState(
    () =>
      ({
        position: "relative",
        background: "green",
        width: "100%",
        height: "100%",
      } as CSSProperties)
  );
  const setRef = useCallback(
    (element: HTMLDivElement) => {
      setDragRef(element);
      setZoomRef(element);
      setContextTrigger(element);
    },
    [setContextTrigger, setDragRef, setZoomRef]
  );
  return (
    <div className="Diagram" style={style} ref={setRef}>
      <ContextMenu />
      <ViewLayer />
    </div>
  );
});
