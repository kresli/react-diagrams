import { FunctionComponent, memo, useMemo } from 'react';
import { useData } from '../hooks';
import { DiagramLink } from './DiagramLink';
import React from 'react';
export const LinksLayer: FunctionComponent = memo(() => {
  const schema = useData();
  const links = useMemo(
    () =>
      schema.links.map(link => (
        <DiagramLink key={`${link.input}${link.output}`} {...link} />
      )),
    [schema.links]
  );
  return (
    <svg
      className="LinksLayer"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        width: 1,
        height: 1,
        overflow: 'overlay',
      }}
    >
      {links}
    </svg>
  );
});
