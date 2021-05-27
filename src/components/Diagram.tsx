import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { Canvas } from "./Canvas";
import { Ctx } from "../hooks";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { SchemaProvider } from "../components";

interface Props {
  schema: Ctx;
}

const theme: DefaultTheme = {
  node: {
    borderRadius: "4pt",
  },
};

export const Diagram = memo(
  forwardRef<HTMLDivElement | null, Props>(({ schema }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    useImperativeHandle(forwardedRef, () => ref.current);
    return (
      <ThemeProvider theme={theme}>
        <SchemaProvider schema={schema}>
          <Canvas ref={ref} />
        </SchemaProvider>
      </ThemeProvider>
    );
  })
);
