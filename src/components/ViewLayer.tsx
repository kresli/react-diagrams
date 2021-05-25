import { FunctionComponent, memo, useMemo, CSSProperties } from "react";
import { useViewport } from "../context";
import { useData } from "../hooks";
import { NodesLayer } from "./NodesLayer";
import { LinksLayer } from "./LinksLayer";

const ViewportBackgroundDefault = () => {
  return <div>default background</div>;
};

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
