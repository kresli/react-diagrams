import { useMemo, useReducer } from "react";
import { schemaReducer } from "../functions";
import { validateSchema } from "../functions/validateSchema";
import { Schema } from "../types";

export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);
  const [schema, onChange] = useReducer(schemaReducer, initSchema);
  const actions = useMemo(
    () => ({
      onChange,
    }),
    []
  );

  return [schema, actions] as const;
};
