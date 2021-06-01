import { memo, useRef, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { useRegisterElement } from "../hooks";
import { ElementType } from "../types";
import { ViewLayer } from "../components";

const DiagramRoot = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.28581;
  text-transform: none;
  color: #182026;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  position: relative;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
`;

export const Canvas = memo(
  forwardRef<HTMLDivElement | null>((_, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    // @ts-ignore
    useImperativeHandle(forwardedRef, () => ref.current);
    useRegisterElement(ref, ElementType.CANVAS);
    return (
      <DiagramRoot className="Diagram" ref={ref}>
        <ViewLayer />
      </DiagramRoot>
    );
  })
);
