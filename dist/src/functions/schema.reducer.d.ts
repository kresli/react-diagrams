import { Schema, SchemaNode } from '../types';
export declare enum SchemaActionType {
    VIEWPORT_MOVE = "VIEWPORT_MOVE",
    VIEWPORT_ZOOM = "VIEWPORT_ZOOM",
    NODE_MOVE = "NODE_MOVE"
}
export declare type SchemaAction = {
    type: SchemaActionType.VIEWPORT_MOVE;
    movementX: number;
    movementY: number;
} | {
    type: SchemaActionType.NODE_MOVE;
    node: SchemaNode;
    movementX: number;
    movementY: number;
    scale: number;
} | {
    type: SchemaActionType.VIEWPORT_ZOOM;
    deltaY: number;
    clientX: number;
    clientY: number;
    viewLayer: Element;
};
export declare const schemaReducer: (schema: Schema, action: SchemaAction) => Schema;
