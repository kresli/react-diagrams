import React, { FunctionComponent, memo, useRef } from "react";
import { useRegisterElement } from "../hooks";
import { ElementType } from "../types";

export const Link: FunctionComponent<React.SVGProps<SVGPathElement>> = memo(
  (props) => {
    const ref = useRef<SVGPathElement>(null);
    // useRegisterElement(ref, ElementType.LINK);
    return <path {...props} ref={ref} />;
  }
);
