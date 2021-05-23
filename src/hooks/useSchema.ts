import { useCallback, useMemo, useReducer, useRef } from "react";
import { SchemaActionType, schemaReducer } from "../functions";
import { validateSchema } from "../functions/validateSchema";
import { Schema } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);
  const viewLayerRef = useRef<HTMLDivElement | null>(null);
  const [schema, onChange] = useReducer(schemaReducer, initSchema);
  const addNode = useCallback((data: { position: [number, number] }) => {
    onChange({ type: SchemaActionType.ADD_NODE, ...data });
  }, []);
  const clientToLocalPosition = (clientX: number, clientY: number) => {
    console.log(clientX);
  };
  const setViewLayerRef = useCallback((elem: HTMLDivElement) => {
    viewLayerRef.current = elem;
  }, []);
  const actions = useMemo(
    () => ({
      onChange,
      addNode,
      clientToLocalPosition,
    }),
    [addNode]
  );

  return [schema, actions] as const;
};
