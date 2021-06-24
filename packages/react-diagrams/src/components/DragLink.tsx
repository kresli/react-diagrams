import { memo, useMemo, useEffect, FunctionComponent } from "react";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import React from "react";
import { SchemaDragLink } from "../types";

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
      const onMouseDown = () => {
        action({
          type: SchemaActionType.DELETE_DRAGGING_LINK,
        });
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
      };
    }, [action]);
    return <path d={line} stroke="white" fill="none" />;
  }
);
