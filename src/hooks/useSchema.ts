import { useCallback, useEffect, useMemo, useReducer } from "react";
import { SchemaActionType, schemaReducer, validateSchema } from "../functions";
import { getElementId, getELementType } from "../functions/getElementType";
import { ElementType, Schema, SchemaNode } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);

  const [
    { links, nodes, position, scale, viewRef, dragLink, canvasRef },
    dispatchAction,
  ] = useReducer(schemaReducer, initSchema);

  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!viewRef) return [0, 0];
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

  const addNode = (node: Partial<SchemaNode>) => {
    dispatchAction({ type: SchemaActionType.ADD_NODE, node });
  };

  const removeNode = (node: SchemaNode) => {
    dispatchAction({ type: SchemaActionType.REMOVE_NODE, node });
  };

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

  return useMemo(
    () => ({
      dispatchAction,
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
      canvas: canvasRef,
    }),
    [
      canvasRef,
      clientToLocalPosition,
      clientToNode,
      dragLink,
      elementsFromPoint,
      links,
      nodes,
      position,
      scale,
      viewRef,
    ]
  );
};

export type Ctx = ReturnType<typeof useSchema>;
