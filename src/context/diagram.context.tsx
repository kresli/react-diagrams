import {
  createContext,
  Dispatch,
  FunctionComponent,
  MutableRefObject,
  useContext,
} from "react";
import { SchemaAction } from "../functions";
import { Ctx } from "../hooks";
import { Schema } from "../types";
export const SchemaContext = createContext<Schema>((null as any) as Schema);
export const SchemaActionContext = createContext<Dispatch<SchemaAction>>(
  (null as any) as Dispatch<SchemaAction>
);
export const SchemaViewportRefContext = createContext<
  MutableRefObject<HTMLDivElement | null>
>((null as any) as MutableRefObject<HTMLDivElement | null>);
export const useViewport = () => useContext(SchemaViewportRefContext);
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
