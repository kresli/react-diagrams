import { FunctionComponent, useCallback } from "react";
import { ContextMenuPopup, ContextMenuProps, useUtils } from "../../components";
import { SchemaActionType } from "../../functions";
import { useAction } from "../../hooks";
import { CONTEXT_MENU_ADD_NODE_BUTTON } from "../../testIds";

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
