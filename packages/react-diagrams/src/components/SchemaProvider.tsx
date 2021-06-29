import { FunctionComponent } from "react";
import {
  DragLinkContext,
  LinksContext,
  NodesContext,
  PositionContext,
  ScaleContext,
  SchemaActionContext,
  ViewportRefContext,
} from "../context";
import { Ctx } from "../hooks";
import React from "react";

export const SchemaProvider: FunctionComponent<{
  schema: Ctx;
}> = ({ children, schema }) => {
  return (
    <ViewportRefContext.Provider value={schema.view}>
      <SchemaActionContext.Provider value={schema.action}>
        <NodesContext.Provider value={schema.nodes}>
          <LinksContext.Provider value={schema.links}>
            <ScaleContext.Provider value={schema.scale}>
              <PositionContext.Provider value={schema.position}>
                <DragLinkContext.Provider value={schema.dragLink}>
                  {children}
                </DragLinkContext.Provider>
              </PositionContext.Provider>
            </ScaleContext.Provider>
          </LinksContext.Provider>
        </NodesContext.Provider>
      </SchemaActionContext.Provider>
    </ViewportRefContext.Provider>
  );
};
