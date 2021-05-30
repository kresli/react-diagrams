import {
  memo,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";
import { SchemaActionType } from "../functions";
import { useAction, useDrag, useRegisterElement, useWheel } from "../hooks";
import { ElementType } from "../types";
import { ViewLayer } from "../components";
import { useAtom } from "custom-react-context-state";
import { ViewportRefAtom } from "./atoms";

const DiagramRoot = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.28581;
  text-transform: none;
  color: #182026;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  position: relative;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
`;

export const Canvas = memo(
  forwardRef<HTMLDivElement | null>((_, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    useImperativeHandle(forwardedRef, () => ref.current);
    const action = useAction();
    const setDragRef = useDrag((movementX, movementY) =>
      action({ type: SchemaActionType.VIEWPORT_MOVE, movementX, movementY })
    );
    const [viewLayer] = useAtom(ViewportRefAtom);
    const setZoomRef = useWheel((data) => {
      if (viewLayer)
        action({
          ...data,
          type: SchemaActionType.VIEWPORT_ZOOM,
          viewLayer,
        });
    });
    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;
      setDragRef(element);
      setZoomRef(element);
    }, [setDragRef, setZoomRef]);
    useRegisterElement(ref, ElementType.CANVAS, { id: "null" });
    return (
      <DiagramRoot className="Diagram" ref={ref}>
        <ViewLayer />
      </DiagramRoot>
    );
  })
);
