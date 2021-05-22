import produce from 'immer';
import { Schema, SchemaNode } from 'src/types';

export enum SchemaActionType {
  VIEWPORT_MOVE = 'VIEWPORT_MOVE',
  VIEWPORT_ZOOM = 'VIEWPORT_ZOOM',
  NODE_MOVE = 'NODE_MOVE',
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
    };

export const schemaReducer = produce((schema: Schema, action: SchemaAction) => {
  switch (action.type) {
    case SchemaActionType.VIEWPORT_MOVE: {
      const { movementX, movementY } = action;
      const [left, top] = schema.position;
      schema.position = [left + movementX, top + movementY];
      return;
    }
    case SchemaActionType.NODE_MOVE: {
      const { node, movementX, movementY, scale } = action;
      const [x, y] = node.position;
      const selected = schema.nodes.find(({ id }) => id === node.id);
      if (!selected) return;
      selected.position = [x + movementX / scale, y + movementY / scale];
      return;
    }
    case SchemaActionType.VIEWPORT_ZOOM: {
      const { deltaY, clientX, clientY, viewLayer } = action;
      if (!viewLayer) return;
      const factor = schema.scale * 0.1;
      const scaleChange = deltaY < 0 ? -factor : factor;
      const scale = schema.scale + scaleChange;
      if (scale <= 0.1) return;
      const { left, top } = viewLayer.getBoundingClientRect();

      const rootLeft = left - schema.position[0];
      const rootTop = top - schema.position[1];

      const x =
        left - rootLeft - (clientX - left) * (scaleChange / schema.scale);
      const y = top - rootTop - (clientY - top) * (scaleChange / schema.scale);
      schema.position = [x, y];
      schema.scale = scale;
      return;
    }
  }
});
