import { FunctionComponent } from "react";
import { LinkRenderProps } from "../types";

export const LinkRenderDefault: FunctionComponent<LinkRenderProps> = ({
  input,
  output,
  start,
  end,
  lineRef,
}) => (
  <line
    ref={lineRef}
    // id={`LINK_${input}${output}`}
    x1={start[0]}
    y1={start[1]}
    x2={end[0]}
    y2={end[1]}
    strokeWidth={3}
    fill="white"
    stroke="rgb(98,98,98)"
  />
);
