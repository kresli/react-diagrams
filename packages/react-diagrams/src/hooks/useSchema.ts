import React, { useCallback, useReducer } from "react";
import { SchemaActionType, schemaReducer, validateSchema } from "../functions";
import { createSchema } from "../functions/createSchema";
import { getElementId, getELementType } from "../functions/getElementType";
import { ElementType, Schema, SchemaNode } from "../types";

export const useSchema = (initSchema?: Partial<Schema>) => {
  const schema = createSchema(initSchema);
  validateSchema(schema);
  const [
    {
      links,
      nodes,
      position,
      scale,
      viewRef,
      dragLink,
      canvasRef,
      portNodePosition,
    },
    dispatchAction,
  ] = useReducer(schemaReducer, schema);

  const recalculatePortsPosition = useCallback((node: SchemaNode) => {
    dispatchAction({ type: SchemaActionType.RECALCULATE_PORTS_POSITION, node });
  }, []);

  // @todo rename local to world as per new naming convention
  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!viewRef) return [0, 0];
      // @todo can we use clientToWorldPositionHere?
      const { left, top } = viewRef.getBoundingClientRect();
      return [(clientX - left) / scale, (clientY - top) / scale];
    },
    [scale, viewRef]
  );

  const clientToNode = useCallback(
    (clientX: number, clientY: number): SchemaNode[] => {
      return document
        .elementsFromPoint(clientX, clientY)
        .map((elem) => {
          const type = getELementType(elem as HTMLElement);
          if (type !== ElementType.NODE) return null;
          return nodes.find(
            ({ id }) => id === getElementId(elem as HTMLElement)
          );
        })
        .filter((v) => v) as SchemaNode[];
    },
    [nodes]
  );

  const addNode = useCallback((node: Partial<SchemaNode>) => {
    dispatchAction({ type: SchemaActionType.ADD_NODE, node });
  }, []);

  const removeNode = useCallback((node: SchemaNode) => {
    dispatchAction({ type: SchemaActionType.REMOVE_NODE, node });
  }, []);

  // @todo rename to elementsTypesFromPoint
  const elementsFromPoint = useCallback(
    (clientX: number, clientY: number): ElementType[] => {
      return document
        .elementsFromPoint(clientX, clientY)
        .map((elem) => {
          return getELementType(elem as HTMLElement);
        })
        .filter((v) => v) as ElementType[];
    },
    []
  );

  const setViewRef = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    dispatchAction({
      type: SchemaActionType.REGISTER_ELEMENT_TYPE,
      elementType: ElementType.VIEW,
      element,
      register: true,
    });
  }, []);

  const moveNode = useCallback(
    (node: SchemaNode, movementX: number, movementY: number) => {
      if (!viewRef) throw new Error("should be able call without view");
      dispatchAction({
        type: SchemaActionType.NODE_MOVE,
        movementX,
        movementY,
        node,
      });
    },
    [viewRef]
  );

  const moveCanvas = useCallback(
    (movementX, movementY) =>
      dispatchAction({
        type: SchemaActionType.VIEWPORT_MOVE,
        movementY,
        movementX,
      }),
    []
  );

  const zoomCanvas = useCallback(
    ({ clientY, clientX, deltaY }: WheelEvent) =>
      dispatchAction({
        type: SchemaActionType.VIEWPORT_ZOOM,
        clientX,
        clientY,
        deltaY,
      }),
    []
  );

  return {
    moveCanvas,
    action: dispatchAction,
    elementsFromPoint,
    clientToLocalPosition,
    clientToNode,
    addNode,
    removeNode,
    dragLink,
    nodes,
    links,
    scale,
    position,
    view: viewRef,
    setViewRef,
    canvas: canvasRef,
    moveNode,
    zoomCanvas,
    portNodePosition,
    recalculatePortsPosition,
  };
};

export type Ctx = ReturnType<typeof useSchema>;
