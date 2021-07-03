import { createContext, Dispatch, FunctionComponent, useMemo } from "react";
import { Ctx } from "../hooks";
import React from "react";
import { SchemaAction } from "../functions";

const useUtilsContext = (schema: Ctx) =>
  useMemo(
    () => ({
      clientToNode: schema.clientToNode,
      clientToWorldPosition: schema.clientToLocalPosition,
    }),
    [schema.clientToLocalPosition, schema.clientToNode]
  );

export const UtilsContext = createContext<ReturnType<typeof useUtilsContext>>(
  null as any
);

export const SchemaActionContext = createContext<Dispatch<SchemaAction>>(
  null as any as Dispatch<SchemaAction>
);

export const SchemaProvider: FunctionComponent<{
  schema: Ctx;
}> = ({ children, schema }) => {
  const utils = useUtilsContext(schema);

  return (
    <UtilsContext.Provider value={utils}>
      <SchemaActionContext.Provider value={schema.action}>
        {children}
      </SchemaActionContext.Provider>
    </UtilsContext.Provider>
  );
};
