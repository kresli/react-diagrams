import { FunctionComponent, memo, useMemo, CSSProperties } from "react";
// import { useData } from "../hooks";
import { NodesLayer, LinksLayer } from "../components";
import { useAtom } from "custom-react-context-state";
import { PositionAtom, ScaleAtom, ViewportRefAtom } from "./atoms";

export const ViewLayer: FunctionComponent = memo(() => {
  // const schema = useData();
  const [, setViewport] = useAtom(ViewportRefAtom);

  // const { position, scale } = schema;
  const [position] = useAtom(PositionAtom);
  const [scale] = useAtom(ScaleAtom);
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
