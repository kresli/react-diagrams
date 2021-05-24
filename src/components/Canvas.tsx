import {
  memo,
  useState,
  CSSProperties,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useViewport } from "../context";
import { SchemaActionType } from "../functions";
import { useAction, useDrag, useWheel } from "../hooks";
import { ViewLayer } from "./ViewLayer";

export const Canvas = memo(
  forwardRef<HTMLDivElement | null>((_, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    useImperativeHandle(forwardedRef, () => ref.current);
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
    }, [setDragRef, setZoomRef]);
    return (
      <div className="Diagram" style={style} ref={ref}>
        <ViewLayer />
      </div>
    );
  })
);
