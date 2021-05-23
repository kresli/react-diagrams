import { useCallback, useMemo, useReducer } from "react";
import { SchemaActionType, schemaReducer } from "../functions";
import { validateSchema } from "../functions/validateSchema";
import { Schema } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);
  const [schema, onChange] = useReducer(schemaReducer, initSchema);
  const addNode = useCallback((data: { position: [number, number] }) => {
    onChange({ type: SchemaActionType.ADD_NODE, ...data });
  }, []);
  const actions = useMemo(
    () => ({
      onChange,
      addNode,
    }),
    [addNode]
  );

  return [schema, actions] as const;
};
