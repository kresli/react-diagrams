// @ts-nocheck
import {
  FunctionComponent,
  memo,
  useMemo,
  CSSProperties,
  useContext,
  useRef,
} from "react";
import { NodesCanvas, LinksCanvas } from "../components";
import { PositionContext, ScaleContext } from "../context";
import { useRegisterElement } from "../hooks";
import { ElementType } from "../types";
import React from "react";

export const ViewLayer: FunctionComponent = memo(() => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [left, top] = useContext(PositionContext);
  const scale = useContext(ScaleContext);
  const viewLayerStyle = useMemo(
    () =>
      ({
        position: "absolute",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        left,
        top,
      } as CSSProperties),
    [left, top, scale]
  );

  useRegisterElement(ref, ElementType.VIEW);

  return (
    <div className="viewLayer" style={viewLayerStyle} ref={ref}>
      <NodesCanvas />
      <LinksCanvas />
    </div>
  );
});
