import { FunctionComponent } from "react";
import {
  SchemaActionContext,
  SchemaContext,
  SchemaViewportRefContext,
} from "../context";
import { Ctx } from "../hooks";

export const SchemaProvider: FunctionComponent<{
  schema: Ctx;
}> = ({ children, schema }) => (
  <SchemaActionContext.Provider value={schema.dispatchAction}>
    <SchemaContext.Provider value={schema.data}>
      <SchemaViewportRefContext.Provider value={schema.viewportRef}>
        {children}
      </SchemaViewportRefContext.Provider>
    </SchemaContext.Provider>
  </SchemaActionContext.Provider>
);
