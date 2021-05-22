import { FunctionComponent, memo, useMemo, CSSProperties } from 'react';
import { useViewport } from 'src/context';
import { useSchema } from 'src/hooks';
import { LinksLayer, NodesLayer } from 'src/components';
import React from 'react';

export const ViewLayer: FunctionComponent = memo(() => {
  const schema = useSchema();
  const [, setViewportRef] = useViewport();

  const { position, scale } = schema;
  const [left, top] = position;
  const viewLayerStyle = useMemo(
    () =>
      ({
        position: 'absolute',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        left,
        top,
      } as CSSProperties),
    [left, top, scale]
  );
  // useCanvasMouse();

  return (
    <div className="viewLayer" style={viewLayerStyle} ref={setViewportRef}>
      <NodesLayer />
      <LinksLayer />
    </div>
  );
});
