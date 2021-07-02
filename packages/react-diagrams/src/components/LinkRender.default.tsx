import { FunctionComponent, useMemo, memo } from "react";
import styled from "styled-components";
import { LinkRenderProps } from "../types";
import React from "react";
import { Link } from "../components";

interface Props extends LinkRenderProps {
  className?: string;
}

const LinkRender: FunctionComponent<Props> = memo(
  ({ start, end, className }) => {
    const points = useMemo(() => {
      const [sx, sy] = start;
      const [ex, ey] = end;
      return `M${sx} ${sy} H${sx + 30} L${ex - 30} ${ey} ${ex} ${ey}`;
    }, [end, start]);
    return <Link className={className} d={points} />;
  }
);

export const LinkRenderDefault = memo(styled(LinkRender)`
  stroke-width: 4;
  stroke: rgb(98, 98, 98);
  stroke-linecap: round;
  fill: none;
  &:hover {
    stroke: rgb(255, 255, 255);
  }
`);
