import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import {
  CONTEXT_MENU_ADD_NODE_BUTTON,
  CONTEXT_MENU_REMOVE_NODE_BUTTON,
} from "../testIds";
import { DiagramContextMenu } from "../components";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import { ContextMenuProps, useUtils } from "./Diagram";

const ContextMenuPopupRoot = styled.div<{ clientX: number; clientY: number }>(
  ({ clientX, clientY }) => ({
    background: "white",
    position: "fixed",
    left: clientX,
    top: clientY,
    zIndex: 99999,
  })
);

const ContextMenuPopup: FunctionComponent<{
  clientX: number;
  clientY: number;
  onClose: () => void;
}> = ({ children, clientX, clientY, onClose }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const isInsideClick = (ev: MouseEvent, element: HTMLDivElement) =>
      [...document.elementsFromPoint(ev.clientX, ev.clientY)].includes(element);
    const mouseDown = (ev: MouseEvent) => {
      if (!ref.current) return;
      if (!isInsideClick(ev, ref.current)) onClose();
    };
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("click", onClose);
    return () => {
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("click", onClose);
    };
  }, [onClose]);
  return createPortal(
    <ContextMenuPopupRoot clientX={clientX} clientY={clientY} ref={ref}>
      {children}
    </ContextMenuPopupRoot>,
    document.body
  );
};

export const CanvasContextMenuDefault: FunctionComponent<ContextMenuProps> = ({
  clientX,
  clientY,
  onClose,
}) => {
  const actions = useAction();
  const { clientToWorldPosition } = useUtils();

  const onAdd = useCallback(() => {
    actions({
      type: SchemaActionType.ADD_NODE,
      node: {
        position: clientToWorldPosition(clientX, clientY),
        inputs: [{ id: `input.${performance.now()}` }],
        outputs: [{ id: `output.${performance.now()}` }],
      },
    });
  }, [actions, clientToWorldPosition, clientX, clientY]);
  return (
    <ContextMenuPopup clientX={clientX} clientY={clientY} onClose={onClose}>
      <button data-testid={CONTEXT_MENU_ADD_NODE_BUTTON} onClick={onAdd}>
        create
      </button>
    </ContextMenuPopup>
  );
};

export const NodeContextMenuDefault: DiagramContextMenu = ({
  clientX,
  clientY,
  onClose,
}) => {
  const actions = useAction();
  const { clientToNode } = useUtils();

  const onRemoveNode = useCallback(() => {
    actions({
      type: SchemaActionType.REMOVE_NODE,
      node: clientToNode(clientX, clientY)[0],
    });
  }, [actions, clientToNode, clientX, clientY]);
  return (
    <ContextMenuPopup clientX={clientX} clientY={clientY} onClose={onClose}>
      <button
        data-testid={CONTEXT_MENU_REMOVE_NODE_BUTTON}
        onClick={onRemoveNode}
      >
        remove node
      </button>
    </ContextMenuPopup>
  );
};
