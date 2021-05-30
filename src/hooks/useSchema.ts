import { useCallback, useMemo, useReducer, useState } from "react";
import { SchemaActionType, schemaReducer, validateSchema } from "../functions";
import { getElementId, getELementType } from "../functions/getElementType";
import { ElementType, Schema, SchemaNode } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);
  const [data, dispatchAction] = useReducer(schemaReducer, initSchema);
  const [view, setView] = useState<HTMLDivElement | null>(null);
  // const viewportRef = useState<HTMLDivElement | null>(null);
  // const [view] = viewportRef;

  const { nodes } = data;

  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!view) return [0, 0];
      const { left, top } = view.getBoundingClientRect();
      return [(clientX - left) / data.scale, (clientY - top) / data.scale];
    },
    [data.scale, view]
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

  const removeNode = (node: SchemaNode) =>
    dispatchAction({ type: SchemaActionType.REMOVE_NODE, node });
  return useMemo(
    () => ({
      data,
      dispatchAction,
      // clientToLocalPosition,
      clientToLocalPosition,
      clientToNode,
      addNode,
      removeNode,
      setView,
    }),
    [data, clientToLocalPosition, clientToNode]
  );
};

export type Ctx = ReturnType<typeof useSchema>;
