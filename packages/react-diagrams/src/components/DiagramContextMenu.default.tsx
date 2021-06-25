import { DiagramContextMenu } from "../components";
import { SchemaActionType } from "../functions";
import { useAction } from "../hooks";
import { ElementType } from "../types";

export const DiagramContextMenuDefault: DiagramContextMenu = ({
  element,
  worldX,
  worldY,
}) => {
  const actions = useAction();
  console.log(element);
  switch (element.type) {
    case ElementType.CANVAS:
      const onAdd = () =>
        actions({
          type: SchemaActionType.ADD_NODE,
          node: {
            position: [worldX, worldY],
            inputs: [{ id: `in${performance.now()}` }],
            outputs: [{ id: `out${performance.now()}` }],
          },
        });
      return <button onClick={onAdd}>create</button>;
    case ElementType.NODE: {
      const onRemoveNode = () =>
        actions({
          type: SchemaActionType.REMOVE_NODE,
          node: element.node,
        });
      return <button onClick={onRemoveNode}>remove node</button>;
    }
    case ElementType.PORT:
      return <div>port</div>;
    case ElementType.LINK:
      return <div>link</div>;
  }
};
