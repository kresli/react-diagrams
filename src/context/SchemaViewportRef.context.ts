import { createContext } from "react";

type SchemaViewportRefContextValue = [
  HTMLDivElement | null,
  (view: HTMLDivElement | null) => void
];
// export const SchemaViewportRefContext = createContext<SchemaViewportRefContextValue>(
//   [null, () => {}]
// );
