import { FunctionComponent, useMemo, memo, useCallback } from "react";
import { Position, SchemaLink } from "../types";
import { LinkRenderDefault } from "../components";
import { useAction } from "../hooks";
import { SchemaActionType } from "../functions";
import { LINK } from "../testIds";

interface Props {
  link: SchemaLink;
  inputNodePostion: Position;
  outputNodePosition: Position;
}

export const DiagramLink: FunctionComponent<Props> = memo(
  ({ link, inputNodePostion, outputNodePosition }) => {
    const { input, output } = link;
    const action = useAction();
    const Render = useMemo(
      () => link.render || LinkRenderDefault,
      [link.render]
    );
    const onDoubleClick = useCallback(() => {
      action({ type: SchemaActionType.LINK_REMOVE, link });
    }, [action, link]);
    return (
      <g
        pointerEvents="visible"
        onDoubleClick={onDoubleClick}
        data-testid={LINK({ input, output })}
      >
        <Render {...link} end={inputNodePostion} start={outputNodePosition} />
      </g>
    );
  }
);
