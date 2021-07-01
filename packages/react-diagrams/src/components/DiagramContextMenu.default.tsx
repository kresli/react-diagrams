import { FunctionComponent, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
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
  useEffect(() => {
    window.addEventListener("click", onClose);
    return () => window.removeEventListener("click", onClose);
  }, [onClose]);
  return createPortal(
    <ContextMenuPopupRoot clientX={clientX} clientY={clientY}>
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
    console.log(clientToWorldPosition(clientX, clientY));
    actions({
      type: SchemaActionType.ADD_NODE,
      node: {
        position: clientToWorldPosition(clientX, clientY),
        inputs: [{ id: `in${performance.now()}` }],
        outputs: [{ id: `out${performance.now()}` }],
      },
    });
  }, [actions, clientToWorldPosition, clientX, clientY]);
  return (
    <ContextMenuPopup clientX={clientX} clientY={clientY} onClose={onClose}>
      <button data-testid="BUTTON_ADD_NODE" onClick={onAdd}>
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
      <button data-testid="BUTTON_NODE_REMOVE" onClick={onRemoveNode}>
        remove node
      </button>
    </ContextMenuPopup>
  );
};
