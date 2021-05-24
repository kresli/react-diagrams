import { FunctionComponent, memo, useMemo, CSSProperties } from "react";
import { useViewport } from "../context";
import { useData } from "../hooks";
import { NodesLayer } from "./NodesLayer";
import { LinksLayer } from "./LinksLayer";

export const ViewLayer: FunctionComponent = memo(() => {
  const schema = useData();
  const viewport = useViewport();

  const { position, scale } = schema;
  const [left, top] = position;
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
  // useCanvasMouse();

  return (
    <div className="viewLayer" style={viewLayerStyle} ref={viewport}>
      <NodesLayer />
      <LinksLayer />
    </div>
  );
});
