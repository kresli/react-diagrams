import {
  memo,
  useState,
  CSSProperties,
  useRef,
  useLayoutEffect,
  MutableRefObject,
} from "react";
import { useViewport } from "../context";
import { SchemaActionType } from "../functions";
import { useAction, useDrag, useWheel } from "../hooks";
import { ViewLayer } from "./ViewLayer";

interface Props {
  ref?: MutableRefObject<HTMLDivElement | null>;
}

export const Canvas = memo<Props>(({ ref: scopeRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const action = useAction();
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
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    setDragRef(element);
    setZoomRef(element);
    if (scopeRef) scopeRef.current = ref.current;
  }, [scopeRef, setDragRef, setZoomRef]);
  return (
    <div className="Diagram" style={style} ref={ref}>
      <ViewLayer />
    </div>
  );
});
