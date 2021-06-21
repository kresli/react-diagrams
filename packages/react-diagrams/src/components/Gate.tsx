import { ElementType, SchemaPort } from "../types";
import { FunctionComponent, useRef } from "react";
import { useRegisterElement } from "../hooks";
import React from "react";

export const Gate: FunctionComponent<{ port: SchemaPort }> = ({ port }) => {
  const { id } = port;
  const gateRef = useRef<HTMLDivElement | null>(null);
  useRegisterElement(gateRef, ElementType.GATE, id);
  return (
    <div
      ref={gateRef}
      className="Gate"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
      }}
    />
  );
};
