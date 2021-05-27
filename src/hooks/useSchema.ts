import { useCallback, useMemo, useReducer, useState } from "react";
import { v4 } from "uuid";
import { SchemaActionType, schemaReducer, validateSchema } from "../functions";
import { getELementType } from "../functions/getElementType";
import { ElementType, Schema, SchemaNode } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);
  const [data, dispatchAction] = useReducer(schemaReducer, initSchema);
  const viewportRef = useState<HTMLDivElement | null>(null);
  const [view] = viewportRef;
  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!view) return [0, 0];
      const { left, top } = view.getBoundingClientRect();
      return [(clientX - left) / data.scale, (clientY - top) / data.scale];
    },
    [data.scale, view]
  );
  const addNode = (node: Partial<SchemaNode>) => {
    const data: SchemaNode = {
      id: v4(),
      position: [0, 0],
      ...node,
    };
    dispatchAction({ type: SchemaActionType.ADD_NODE, ...data });
  };
  const elementsFromPoint = useCallback(
    (clientX: number, clientY: number): ElementType[] => {
      console.log(document.elementsFromPoint(clientX, clientY));
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
      data,
      dispatchAction,
      viewportRef,
      clientToLocalPosition,
      addNode,
      elementsFromPoint,
    }),
    [clientToLocalPosition, data, elementsFromPoint, viewportRef]
  );
};

export type Ctx = ReturnType<typeof useSchema>;
