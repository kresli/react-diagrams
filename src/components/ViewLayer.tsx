import { FunctionComponent, memo, useMemo, CSSProperties } from "react";
import { useData, useViewport } from "../hooks";
import { NodesLayer, LinksLayer } from "../components";

export const ViewLayer: FunctionComponent = memo(() => {
  const schema = useData();
  const [, setViewport] = useViewport();

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

  return (
    <div className="viewLayer" style={viewLayerStyle} ref={setViewport}>
      <NodesLayer />
      <LinksLayer />
    </div>
  );
});
