import { FunctionComponent } from "react";
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

export const CanvasContextMenuDefault: FunctionComponent<ContextMenuProps> = ({
  clientX,
  clientY,
}) => {
  const actions = useAction();

  const onAdd = () =>
    actions({
      type: SchemaActionType.ADD_NODE,
      node: {
        position: [clientX, clientY],
        inputs: [{ id: `in${performance.now()}` }],
        outputs: [{ id: `out${performance.now()}` }],
      },
    });
  return (
    <button data-testid="BUTTON_ADD_NODE" onClick={onAdd}>
      create
    </button>
  );
};

export const NodeContextMenuDefault: DiagramContextMenu = ({
  clientX,
  clientY,
}) => {
  const actions = useAction();
  const { clientToNode } = useUtils();

  const onRemoveNode = () =>
    actions({
      type: SchemaActionType.REMOVE_NODE,
      node: clientToNode(clientX, clientY)[0],
    });
  return (
    <button data-testid="BUTTON_NODE_REMOVE" onClick={onRemoveNode}>
      remove node
    </button>
  );
};
