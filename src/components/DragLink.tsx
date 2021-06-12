import { memo, useContext, useMemo, useEffect } from "react";
import { DragLinkContext } from "../context";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import React from "react";

export const DragLink = memo(() => {
  const action = useAction();
  const dragLink = useContext(DragLinkContext);
  const line = useMemo(() => {
    if (!dragLink) return;
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
});
