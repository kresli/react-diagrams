import { ElementType, RegisteredElement, Schema, SchemaNode } from "../types";
import { v4 } from "uuid";
export enum SchemaActionType {
  VIEWPORT_SET = "VIEWPORT_SET",
  VIEWPORT_MOVE = "VIEWPORT_MOVE",
  VIEWPORT_ZOOM = "VIEWPORT_ZOOM",
  NODE_MOVE = "NODE_MOVE",
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
  REGISTER_ELEMENT_TYPE = "REGISTER_ELEMENT_TYPE",
  ELEMENT_MOVE = "MOVE_ELEMENT",
}

export type SchemaAction =
  | {
      type: SchemaActionType.VIEWPORT_MOVE;
      movementX: number;
      movementY: number;
    }
  | {
      type: SchemaActionType.NODE_MOVE;
      node: SchemaNode;
      movementX: number;
      movementY: number;
      scale: number;
    }
  | {
      type: SchemaActionType.VIEWPORT_ZOOM;
      deltaY: number;
      clientX: number;
      clientY: number;
    }
  | {
      type: SchemaActionType.ADD_NODE;
      node: Partial<SchemaNode>;
    }
  | {
      type: SchemaActionType.REMOVE_NODE;
      node: SchemaNode;
    }
  | {
      type: SchemaActionType.REGISTER_ELEMENT_TYPE;
      element: HTMLOrSVGElement;
      elementType: ElementType;
      data?: any;
      register: boolean;
    }
  | {
      type: SchemaActionType.ELEMENT_MOVE;
      registeredElement: RegisteredElement;
      movementX: number;
      movementY: number;
    };
export const schemaReducer = (schema: Schema, action: SchemaAction): Schema => {
  switch (action.type) {
    case SchemaActionType.VIEWPORT_MOVE: {
      const { movementX, movementY } = action;
      const [left, top] = schema.position;
      const position: [number, number] = [left + movementX, top + movementY];
      return {
        ...schema,
        position,
      };
    }
    case SchemaActionType.NODE_MOVE: {
      const { node, movementX, movementY, scale } = action;
      const [x, y] = node.position;
      const nodes = schema.nodes.map((n) =>
        n.id === node.id
          ? {
              ...n,
              position: [x + movementX / scale, y + movementY / scale] as [
                number,
                number
              ],
            }
          : n
      );
      return {
        ...schema,
        nodes,
      };
    }
    case SchemaActionType.VIEWPORT_ZOOM: {
      const { deltaY, clientX, clientY } = action;
      const { viewRef } = schema;
      if (!viewRef) return schema;
      const factor = schema.scale * 0.1;
      const scaleChange = deltaY < 0 ? -factor : factor;
      const scale = schema.scale + scaleChange;
      if (scale <= 0.1) return schema;
      const { left, top } = viewRef.getBoundingClientRect();

      const rootLeft = left - schema.position[0];
      const rootTop = top - schema.position[1];

      const x =
        left - rootLeft - (clientX - left) * (scaleChange / schema.scale);
      const y = top - rootTop - (clientY - top) * (scaleChange / schema.scale);
      const position: [number, number] = [x, y];
      return {
        ...schema,
        position,
        scale,
      };
    }
    case SchemaActionType.ADD_NODE: {
      const node: SchemaNode = {
        id: v4(),
        position: [0, 0],
        ...action.node,
      };
      const nodes: SchemaNode[] = [...schema.nodes, node];
      return {
        ...schema,
        nodes,
      };
    }
    case SchemaActionType.REMOVE_NODE: {
      const nodes = schema.nodes.filter((node) => node !== action.node);
      const io = [
        ...(action.node.inputs?.map(({ id }) => id) || []),
        ...(action.node.outputs?.map(({ id }) => id) || []),
      ];
      const links = schema.links.filter(
        ({ input, output }) => !(io.includes(input) || io.includes(output))
      );
      return {
        ...schema,
        links,
        nodes,
      };
    }
    case SchemaActionType.REGISTER_ELEMENT_TYPE: {
      const { element, elementType, register, data } = action;
      const registeredElements = schema.registeredElements;
      if (register) {
        registeredElements.set(element, { element, type: elementType, data });
      } else {
        registeredElements.delete(element);
      }

      const { CANVAS, VIEW } = ElementType;

      const canvasRef =
        elementType === CANVAS ? (element as HTMLDivElement) : schema.canvasRef;
      const viewRef =
        elementType === VIEW ? (element as HTMLDivElement) : schema.viewRef;
      return {
        ...schema,
        registeredElements,
        canvasRef,
        viewRef,
      };
    }
    case SchemaActionType.ELEMENT_MOVE: {
      const { movementX, movementY } = action;
      switch (action.registeredElement.type) {
        case ElementType.VIEW:
          return schemaReducer(schema, {
            type: SchemaActionType.VIEWPORT_MOVE,
            movementY,
            movementX,
          });
        case ElementType.NODE: {
          const { scale, nodes } = schema;
          const nodeId = action.registeredElement.data;
          // @TODO create a nodeId to node map
          const node = nodes.find(({ id }) => id === nodeId);
          if (!node) return schema;
          return schemaReducer(schema, {
            type: SchemaActionType.NODE_MOVE,
            movementY,
            movementX,
            scale,
            node,
          });
        }
      }
      return schema;
    }
    default:
      return schema;
  }
};
