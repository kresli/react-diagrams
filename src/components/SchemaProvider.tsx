import { FunctionComponent, useCallback } from "react";
import {
  SchemaActionContext,
  // SchemaContext,
  // SchemaViewportRefContext,
} from "../context";
import { Ctx } from "../hooks";
import { AtomsProvider, AtomsOnChange } from "custom-react-context-state";
import {
  LinksAtom,
  NodesAtom,
  PositionAtom,
  ScaleAtom,
  ViewportRefAtom,
} from "./atoms";

const atoms = {
  viewRef: ViewportRefAtom,
  nodes: NodesAtom,
  position: PositionAtom,
  scale: ScaleAtom,
  links: LinksAtom,
};

export const SchemaProvider: FunctionComponent<{
  schema: Ctx;
}> = ({ children, schema }) => {
  const { setView } = schema;
  const onAtomsChange: AtomsOnChange<typeof atoms> = useCallback(
    (change) => {
      console.log("----->", change);
      if (change.viewRef) setView(change.viewRef);
    },
    [setView]
  );
  return (
    <AtomsProvider atoms={atoms} onChange={onAtomsChange}>
      <SchemaActionContext.Provider value={schema.dispatchAction}>
        {/* <SchemaContext.Provider value={schema.data}> */}
        {/* <SchemaViewportRefContext.Provider value={schema.viewportRef}> */}
        {children}
        {/* </SchemaViewportRefContext.Provider> */}
        {/* </SchemaContext.Provider> */}
      </SchemaActionContext.Provider>
    </AtomsProvider>
  );
};
