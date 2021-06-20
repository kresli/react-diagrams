import { createContext, Dispatch } from "react";
import { SchemaAction } from "../functions";

export const SchemaActionContext = createContext<Dispatch<SchemaAction>>(
  (null as any) as Dispatch<SchemaAction>
);
