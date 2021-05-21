import { createContext, Dispatch, FunctionComponent } from "react";
import { SchemaAction } from "src/functions";
import { Schema } from "src/types";

export const SchemaContext = createContext<Schema>(null as any as Schema);
export const SchemaActionContext = createContext<Dispatch<SchemaAction>>(
  null as any as Dispatch<SchemaAction>
);

export const SchemaProvider: FunctionComponent<{
  schema: Schema;
  onChange: Dispatch<SchemaAction>;
}> = ({ children, schema, onChange }) => {
  // const [schema, dispatch] = useReducer(schemaReducer, value);
  return (
    <SchemaActionContext.Provider value={onChange}>
      <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>
    </SchemaActionContext.Provider>
  );
};
