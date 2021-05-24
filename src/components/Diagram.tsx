import { Dispatch, forwardRef, memo, useImperativeHandle, useRef } from "react";
import { SchemaProvider, ViewportProvider } from "../context";
import { Canvas } from "./Canvas";
import { Schema } from "../types";
import { SchemaAction } from "../functions";
import { Ctx } from "../hooks";

interface Props {
  schema: Ctx;
}
export const Diagram = memo(
  forwardRef<HTMLDivElement | null, Props>(({ schema }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    useImperativeHandle(forwardedRef, () => ref.current);
    return (
      <ViewportProvider>
        <SchemaProvider schema={schema.data} onChange={schema.dispatchAction}>
          <Canvas ref={ref} />
        </SchemaProvider>
      </ViewportProvider>
    );
  })
);
