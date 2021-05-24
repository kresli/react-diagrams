import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { SchemaProvider } from "../context";
import { Canvas } from "./Canvas";
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
      <SchemaProvider schema={schema}>
        <Canvas ref={ref} />
      </SchemaProvider>
    );
  })
);
