import { FunctionComponent, useMemo, memo } from "react";
import { Position, SchemaLink } from "../types";
import { LinkRenderDefault } from "../components";

interface Props {
  link: SchemaLink;
  inputNodePostion: Position;
  outputNodePosition: Position;
}

export const DiagramLink: FunctionComponent<Props> = memo(
  ({ link, inputNodePostion, outputNodePosition }) => {
    const Render = useMemo(
      () => link.render || LinkRenderDefault,
      [link.render]
    );
    return (
      <g pointerEvents="visible">
        <Render {...link} start={inputNodePostion} end={outputNodePosition} />
      </g>
    );
  }
);
