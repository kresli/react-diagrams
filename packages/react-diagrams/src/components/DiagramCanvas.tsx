import {
  memo,
  useRef,
  useCallback,
  FunctionComponent,
  useContext,
  useState,
  createContext,
  useMemo,
} from "react";
import styled from "styled-components";
import { useAction, useDrag, useRegisterElement, useWheel } from "../hooks";
import { ElementType } from "../types";
import { ViewLayer } from ".";
import {
  clientToWorldPosition as _clientToWorldPosition,
  SchemaActionType,
} from "../functions";
import React from "react";

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
  overflow: hidden;
`;

// const useUtils = () => useUtilsContext();

// const useUtilsContext = () => {
//   const viewport = useRef<HTMLElement | null>(null);
//   const setViewport = useCallback(
//     (element: HTMLElement | null) => (viewport.current = element),
//     []
//   );

//   const clientToWorldPosition = useCallback(
//     (left: number, top: number) =>
//       viewport.current
//         ? _clientToWorldPosition([left, top], viewport.current, scale)
//         : [0, 0],
//     []
//   );

//   return useMemo(
//     () => ({
//       setViewport,
//       viewport: viewport.current,
//       clientToWorldPosition,
//     }),
//     []
//   );
// };

// const UtilsContext = createContext<ReturnType<typeof useUtilsContext>>(null);

interface Props {
  onCanvasMove: (movementX: number, movementY: number) => void;
  onCanvasZoom: (ev: WheelEvent) => void;
}

export const DiagramCanvas: FunctionComponent<Props> = memo(
  ({ children, onCanvasMove, onCanvasZoom }) => {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    useDrag(ref, onCanvasMove);
    useWheel(ref, onCanvasZoom);
    // const action = useAction();
    // useRegisterElement(ref, ElementType.CANVAS);
    // useDrag(
    //   ref,
    //   useCallback(
    //     (movementX, movementY) => {
    //       action({
    //         type: SchemaActionType.VIEWPORT_MOVE,
    //         movementX,
    //         movementY,
    //       });
    //     },
    //     [action]
    //   )
    // );
    // useWheel(
    //   ref,
    //   useCallback(
    //     (ev) => {
    //       ev.stopImmediatePropagation();
    //       ev.preventDefault();
    //       const { clientX, clientY, deltaY } = ev;
    //       action({
    //         type: SchemaActionType.VIEWPORT_ZOOM,
    //         clientX,
    //         clientY,
    //         deltaY,
    //       });
    //     },
    //     [action]
    //   )
    // );
    // const viewportRef = useRef<HTMLDivElement | null>(null);
    // const utils = useUtilsContext();

    return (
      <DiagramRoot className="Diagram" data-testid="canvas" ref={setRef}>
        {/* <UtilsContext.Provider value={utils}> */}
        <div className="Viewport">{children}</div>
        {/* </UtilsContext.Provider> */}
      </DiagramRoot>
    );
  }
);
