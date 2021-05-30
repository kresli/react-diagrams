import {
  FunctionComponent,
  memo,
  useMemo,
  CSSProperties,
  useContext,
  useCallback,
} from "react";
import { NodesLayer, LinksLayer } from "../components";
import { PositionContext, ScaleContext } from "../context";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";

export const ViewLayer: FunctionComponent = memo(() => {
  const [left, top] = useContext(PositionContext);
  const scale = useContext(ScaleContext);
  const action = useAction();
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

  const setViewport = useCallback(
    (element: HTMLDivElement | null) => {
      action({ type: SchemaActionType.VIEWPORT_SET, element });
    },
    [action]
  );

  return (
    <div className="viewLayer" style={viewLayerStyle} ref={setViewport}>
      <NodesLayer />
      <LinksLayer />
    </div>
  );
});
