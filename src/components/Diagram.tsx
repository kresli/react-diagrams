import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { Canvas } from "./Canvas";
import { Ctx } from "../hooks";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { SchemaProvider } from "../components";

interface Props {
  schema: Ctx;
}

const theme: DefaultTheme = {
  zIndex: {
    linksLayer: 100,
    nodesLayer: 200,
  },
  node: {
    borderRadius: "4pt",
  },
};

export const Diagram = memo<Props>(({ schema }) => {
  return (
    <ThemeProvider theme={theme}>
      <SchemaProvider schema={schema}>
        <Canvas />
      </SchemaProvider>
    </ThemeProvider>
  );
});
