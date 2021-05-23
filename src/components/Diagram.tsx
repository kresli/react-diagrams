import { Dispatch, memo, MutableRefObject } from "react";
import { SchemaProvider, ViewportProvider } from "../context";
import { Canvas } from "./Canvas";
import { Schema } from "../types";
import { SchemaAction } from "../functions";

interface Props {
  schema: Schema;
  onChange: Dispatch<SchemaAction>;
  ref?: MutableRefObject<HTMLDivElement | null>;
}
export const Diagram = memo<Props>(({ schema, onChange, ref }) => {
  return (
    <ViewportProvider>
      <SchemaProvider schema={schema} onChange={onChange}>
        <Canvas ref={ref} />
      </SchemaProvider>
    </ViewportProvider>
  );
});
