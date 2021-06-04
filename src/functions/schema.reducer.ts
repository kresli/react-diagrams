import {
  ElementType,
  Schema,
  SchemaLink,
  SchemaNode,
  Position,
  DragLink,
  DragLinkDirection,
} from "../types";
import { v4 } from "uuid";
import { clientToWorldPosition } from "./clientToWorldPosition";

export enum SchemaActionType {
  VIEWPORT_SET = "VIEWPORT_SET",
  VIEWPORT_MOVE = "VIEWPORT_MOVE",
  VIEWPORT_ZOOM = "VIEWPORT_ZOOM",
  NODE_MOVE = "NODE_MOVE",
  ADD_NODE = "ADD_NODE",
  REMOVE_NODE = "REMOVE_NODE",
  LINK_CREATE = "LINK_CREATE",
  LINK_REMOVE = "LINK_REMOVE",
  REGISTER_ELEMENT_TYPE = "REGISTER_ELEMENT_TYPE",
  CREATE_DRAGGING_LINK = "CREATE_DRAGGING_LINK",
  MOVE_DRAGGING_LINK = "MOVE_DRAGGING_LINK",
  DELETE_DRAGGING_LINK = "DELETE_DRAGGING_LINK",
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
      type: SchemaActionType.LINK_REMOVE;
      link: SchemaLink;
    }
  | {
      type: SchemaActionType.LINK_CREATE;
      input: string;
      output: string;
    }
  | {
      type: SchemaActionType.CREATE_DRAGGING_LINK;
      direction: DragLinkDirection;
      portId: string;
      clientX: number;
      clientY: number;
    }
  | {
      type: SchemaActionType.MOVE_DRAGGING_LINK;
      movementX: number;
      movementY: number;
    }
  | {
      type: SchemaActionType.DELETE_DRAGGING_LINK;
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
      const { node, movementX, movementY } = action;
      const { scale } = schema;
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
    case SchemaActionType.LINK_REMOVE: {
      const links = schema.links.filter((link) => link !== action.link);
      return {
        ...schema,
        links,
      };
    }
    case SchemaActionType.LINK_CREATE: {
      const { input, output } = action;
      const link: SchemaLink = {
        output,
        input,
      };
      const links = [...schema.links, link];
      return {
        ...schema,
        links,
      };
    }
    case SchemaActionType.CREATE_DRAGGING_LINK: {
      const { direction, portId, clientX, clientY } = action;
      if (schema.dragLink) {
        const input =
          schema.dragLink.direction === DragLinkDirection.FORWARD
            ? schema.dragLink.portId
            : action.portId;
        const output =
          schema.dragLink.direction === DragLinkDirection.FORWARD
            ? action.portId
            : schema.dragLink.portId;
        return schemaReducer(
          {
            ...schema,
            dragLink: null,
          },
          {
            type: SchemaActionType.LINK_CREATE,
            input,
            output,
          }
        );
      }
      if (!schema.viewRef) return schema;
      const start = clientToWorldPosition(
        [clientX, clientY],
        schema.viewRef,
        schema.scale
      );
      const end = clientToWorldPosition(
        [clientX, clientY],
        schema.viewRef,
        schema.scale
      );
      const dragLink: DragLink = {
        direction,
        start,
        end,
        portId,
      };
      return {
        ...schema,
        dragLink,
      };
    }
    case SchemaActionType.MOVE_DRAGGING_LINK: {
      if (!schema.dragLink) return schema;
      const { scale } = schema;
      const { movementX, movementY } = action;
      const [x, y] = schema.dragLink.end;
      const { start } = schema.dragLink;
      const end: Position = [x + movementX / scale, y + movementY / scale];
      const dragLink: DragLink = {
        ...schema.dragLink,
        start,
        end,
      };
      return {
        ...schema,
        dragLink,
      };
    }
    case SchemaActionType.DELETE_DRAGGING_LINK: {
      return {
        ...schema,
        dragLink: null,
      };
    }
    default:
      return schema;
  }
};
