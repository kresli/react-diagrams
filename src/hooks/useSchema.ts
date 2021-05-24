import { Dispatch, useMemo, useReducer, useState } from "react";
import { SchemaAction, schemaReducer } from "../functions";
import { validateSchema } from "../functions/validateSchema";
import { Schema } from "../types";

export interface Ctx {
  viewportRef: [HTMLDivElement | null, (view: HTMLDivElement | null) => void];
  data: Schema;
  dispatchAction: Dispatch<SchemaAction>;
  clientToLocalPosition: (clientX: number, clientY: number) => [number, number];
}
export const useSchema = (initSchema: Schema): Ctx => {
  validateSchema(initSchema);
  const [data, dispatchAction] = useReducer(schemaReducer, initSchema);
  const clientToLocalPosition = (): [number, number] => [0, 0];
  const viewportRef = useState<HTMLDivElement | null>(null);
  return useMemo(
    () => ({
      data,
      dispatchAction,
      viewportRef,
      clientToLocalPosition,
    }),
    [data, viewportRef]
  );
};

// export const useSchema = (initSchema: Schema) => {
//   validateSchema(initSchema);
//   const viewLayerRef = useRef<HTMLDivElement | null>(null);
//   const [schema, onChange] = useReducer(schemaReducer, initSchema);
//   const addNode = useCallback((data: { position: [number, number] }) => {
//     onChange({ type: SchemaActionType.ADD_NODE, ...data });
//   }, []);
//   const clientToLocalPosition = (clientX: number, clientY: number) => {
//     console.log(clientX);
//   };
//   const setViewLayerRef = useCallback((elem: HTMLDivElement) => {
//     viewLayerRef.current = elem;
//   }, []);
//   const actions = useMemo(
//     () => ({
//       onChange,
//       addNode,
//       clientToLocalPosition,
//     }),
//     [addNode]
//   );

//   return [schema, actions] as const;
// };
