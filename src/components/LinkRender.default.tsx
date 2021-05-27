import { FunctionComponent, useMemo, memo } from "react";
import styled from "styled-components";
import { LinkRenderProps } from "../types";

export const LinkRender: FunctionComponent<
  LinkRenderProps & { className?: string }
> = ({ input, output, start, end, lineRef, className }) => {
  const line = useMemo(() => {
    const [sx, sy] = start;
    const [ex, ey] = end;
    return `M${sx} ${sy} H${sx + 30} L${ex - 30} ${ey} ${ex} ${ey}`;
  }, [end, start]);
  return <path className={className} ref={lineRef} d={line} />;
};

export const LinkRenderDefault = memo(styled(LinkRender)`
  stroke-width: 4;
  stroke: rgb(98, 98, 98);
  stroke-linecap: round;
  fill: none;
  &:hover {
    stroke: rgb(255, 255, 255);
  }
`);
