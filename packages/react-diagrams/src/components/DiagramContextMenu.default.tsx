import { FunctionComponent, useCallback } from "react";
import styled from "styled-components";
import { DiagramContextMenu } from "../components";
import { SchemaActionType } from "../functions";
import { Ctx, useAction } from "../hooks";
import { ElementType, SchemaNode } from "../types";
import { ContextMenuProps, useUtils } from "./Diagram";

// export const DiagramContextMenuDefault: DiagramContextMenu = ({
//   element,
//   worldX,
//   worldY,
// }) => {
//   const actions = useAction();
//   switch (element.type) {
//     case ElementType.CANVAS:
//       const onAdd = () =>
//         actions({
//           type: SchemaActionType.ADD_NODE,
//           node: {
//             position: [worldX, worldY],
//             inputs: [{ id: `in${performance.now()}` }],
//             outputs: [{ id: `out${performance.now()}` }],
//           },
//         });
//       return (
//         <button data-testid="BUTTON_ADD_NODE" onClick={onAdd}>
//           create
//         </button>
//       );
//     case ElementType.NODE: {
//       const onRemoveNode = () =>
//         actions({
//           type: SchemaActionType.REMOVE_NODE,
//           node: element.node,
//         });
//       return (
//         <button data-testid="BUTTON_NODE_REMOVE" onClick={onRemoveNode}>
//           remove node
//         </button>
//       );
//     }
//     case ElementType.PORT:
//       return <div>port</div>;
//     case ElementType.LINK:
//       return <div>link</div>;
//   }
// };

const ContextMenuPopup = styled.div<{ clientX: number; clientY: number }>(
  ({ clientX, clientY }) => ({
    background: "white",
    position: "fixed",
    left: clientX,
    top: clientY,
    zIndex: 99999,
  })
);

export const CanvasContextMenuDefault: FunctionComponent<ContextMenuProps> = ({
  clientX,
  clientY,
  onClose,
}) => {
  const actions = useAction();

  const onAdd = () => {
    actions({
      type: SchemaActionType.ADD_NODE,
      node: {
        position: [clientX, clientY],
        inputs: [{ id: `in${performance.now()}` }],
        outputs: [{ id: `out${performance.now()}` }],
      },
    });
    onClose();
  };
  return (
    <ContextMenuPopup clientX={clientX} clientY={clientY}>
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
    onClose();
  }, [actions, clientToNode, clientX, clientY, onClose]);
  return (
    <ContextMenuPopup clientX={clientX} clientY={clientY}>
      <button data-testid="BUTTON_NODE_REMOVE" onClick={onRemoveNode}>
        remove node
      </button>
    </ContextMenuPopup>
  );
};
