import { Dispatch, useCallback, useMemo, useReducer, useState } from "react";
import { v4 } from "uuid";
import { SchemaAction, SchemaActionType, schemaReducer } from "../functions";
import { validateSchema } from "../functions/validateSchema";
import { Schema, SchemaNode } from "../types";

export interface Ctx {
  viewportRef: [HTMLDivElement | null, (view: HTMLDivElement | null) => void];
  data: Schema;
  dispatchAction: Dispatch<SchemaAction>;
  clientToLocalPosition: (clientX: number, clientY: number) => [number, number];
  addNode: (node: Partial<SchemaNode>) => void;
}
export const useSchema = (initSchema: Schema): Ctx => {
  validateSchema(initSchema);
  const [data, dispatchAction] = useReducer(schemaReducer, initSchema);
  const viewportRef = useState<HTMLDivElement | null>(null);
  const [view] = viewportRef;
  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!view) return [0, 0];
      const { left, top } = view.getBoundingClientRect();
      return [(clientX - left) / data.scale, (clientY - top) / data.scale];
    },
    [data.scale, view]
  );
  const addNode = (node: Partial<SchemaNode>) => {
    const data: SchemaNode = {
      id: v4(),
      position: [0, 0],
      ...node,
    };
    dispatchAction({ type: SchemaActionType.ADD_NODE, ...data });
  };
  return useMemo(
    () => ({
      data,
      dispatchAction,
      viewportRef,
      clientToLocalPosition,
      addNode,
    }),
    [clientToLocalPosition, data, viewportRef]
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
