import { FunctionComponent, useMemo, memo, useRef } from "react";
import styled from "styled-components";
import { ElementType, LinkRenderProps } from "../types";
import React from "react";
import { useRegisterElement } from "../hooks";

const LinkRender: FunctionComponent<
  { link: LinkRenderProps } & { className?: string }
> = ({ link, className }) => {
  const { start, end } = link;
  const line = useMemo(() => {
    const [sx, sy] = start;
    const [ex, ey] = end;
    return `M${sx} ${sy} H${sx + 30} L${ex - 30} ${ey} ${ex} ${ey}`;
  }, [end, start]);
  const ref = useRef<SVGLineElement>(null);
  useRegisterElement(ref, ElementType.LINK);
  return <path className={className} d={line} ref={ref} />;
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
