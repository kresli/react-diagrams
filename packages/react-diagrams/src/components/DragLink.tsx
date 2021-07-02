import { memo, useMemo, useEffect, FunctionComponent } from "react";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import React from "react";
import { SchemaDragLink } from "../types";
import { DRAG_LINK } from "../testIds";

export const DragLink: FunctionComponent<{ dragLink: SchemaDragLink }> = memo(
  ({ dragLink }) => {
    const action = useAction();
    const line = useMemo(() => {
      const [sx, sy] = dragLink.start;
      const [ex, ey] = dragLink.end;
      return `M${sx} ${sy} ${ex} ${ey}`;
    }, [dragLink]);
    useEffect(() => {
      const onMouseMove = (ev: MouseEvent) => {
        const { movementX, movementY } = ev;
        ev.stopImmediatePropagation();
        action({
          type: SchemaActionType.MOVE_DRAGGING_LINK,
          movementX,
          movementY,
        });
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    }, [action]);
    return <path data-testid={DRAG_LINK} d={line} stroke="white" fill="none" />;
  }
);
