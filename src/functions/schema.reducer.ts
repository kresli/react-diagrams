import { Schema, SchemaLink, SchemaNode } from "../types";
import { v4 } from "uuid";
export enum SchemaActionType {
  VIEWPORT_SET = "VIEWPORT_SET",
  VIEWPORT_MOVE = "VIEWPORT_MOVE",
  VIEWPORT_ZOOM = "VIEWPORT_ZOOM",
  NODE_MOVE = "NODE_MOVE",
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
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
      viewLayer: Element;
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
      type: SchemaActionType.VIEWPORT_SET;
      element: HTMLDivElement | null;
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
    case SchemaActionType.VIEWPORT_SET: {
      return {
        ...schema,
        view: action.element,
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
      const { deltaY, clientX, clientY, viewLayer } = action;
      if (!viewLayer) return schema;
      const factor = schema.scale * 0.1;
      const scaleChange = deltaY < 0 ? -factor : factor;
      const scale = schema.scale + scaleChange;
      if (scale <= 0.1) return schema;
      const { left, top } = viewLayer.getBoundingClientRect();

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
    default:
      return schema;
  }
};
