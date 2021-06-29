import { ElementType, SchemaPort } from "../types";
import { FunctionComponent, useRef, useState } from "react";
import { useRegElement, useRegisterElement } from "../hooks";
import React from "react";

export const Gate: FunctionComponent<{ port: SchemaPort }> = ({ port }) => {
  const { id } = port;
  // const gateRef = useRef<HTMLDivElement | null>(null);
  const [gateRef, setGateRef] = useState<HTMLElement | null>(null);
  // useRegisterElement(gateRef, ElementType.GATE, id);
  useRegElement(gateRef, ElementType.GATE, id);
  return (
    <div
      ref={setGateRef}
      className="Gate"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
      }}
    />
  );
};
