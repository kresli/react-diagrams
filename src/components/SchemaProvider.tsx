import { FunctionComponent } from "react";
import {
  LinksContext,
  NodesContext,
  PositionContext,
  ScaleContext,
  SchemaActionContext,
  ViewportRefContext,
} from "../context";
import { Ctx } from "../hooks";

export const SchemaProvider: FunctionComponent<{
  schema: Ctx;
}> = ({ children, schema }) => {
  return (
    <ViewportRefContext.Provider value={schema.view}>
      <SchemaActionContext.Provider value={schema.dispatchAction}>
        <NodesContext.Provider value={schema.nodes}>
          <LinksContext.Provider value={schema.links}>
            <ScaleContext.Provider value={schema.scale}>
              <PositionContext.Provider value={schema.position}>
                {children}
              </PositionContext.Provider>
            </ScaleContext.Provider>
          </LinksContext.Provider>
        </NodesContext.Provider>
      </SchemaActionContext.Provider>
    </ViewportRefContext.Provider>
  );
};
