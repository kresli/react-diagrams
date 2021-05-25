import { FunctionComponent } from "react";
import { LinkRenderProps } from "../types";

export const LinkRenderDefault: FunctionComponent<LinkRenderProps> = ({
  input,
  output,
  start,
  end,
}) => (
  <line
    id={`LINK_${input}${output}`}
    x1={start[0]}
    y1={start[1]}
    x2={end[0]}
    y2={end[1]}
    stroke="black"
  />
);
