import { useCallback } from "react";
import {
  DiagramContextMenu,
  useUtils,
  ContextMenuPopup,
} from "../../components";
import { SchemaActionType } from "../../functions";
import { useAction } from "../../hooks";
import { CONTEXT_MENU_REMOVE_NODE_BUTTON } from "../../testIds";

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
