import { FunctionComponent, memo, useMemo } from "react";
import styled, { CSSProperties } from "styled-components";
import { NodeRenderProps, SchemaPort, PortType } from "../types";
import { Port } from "../components";
import { Gate } from "./Gate";
import React from "react";
import { NODE_DRAG_HOLDER } from "../testIds";

const PortRoot = styled.div<{ type: PortType }>`
  width: 12px;
  height: 12px;
  background: rgb(98, 98, 98);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 100%;
  top: 4px;
  left: ${({ type }) => (type === PortType.INPUT ? "-26px" : "auto")};
  right: ${({ type }) => (type === PortType.OUTPUT ? "-26px" : "auto")};
  &:hover {
    background-color: red;
  }
`;

const Label = styled.span`
  color: white;
`;

const InputOutput: FunctionComponent<{
  port: SchemaPort;
  type: PortType;
}> = memo(({ type, port }) => {
  const style: CSSProperties = useMemo(
    () => ({
      flex: 1,
      display: "flex",
      position: "relative",
      minHeight: 20,
      justifyContent: type === PortType.INPUT ? "flex-start" : "flex-end",
    }),
    [type]
  );

  return (
    <div className="InputOutput" style={style}>
      <Label>{port.label}</Label>
      <Port port={port}>
        <PortRoot type={type}>
          <Gate port={port} />
        </PortRoot>
      </Port>
    </div>
  );
});

const NodeRenderRoot = styled.div`
  background-color: #2d2d2d;
  border-radius: 4pt;
  &:hover {
    box-shadow: 0 0 0px 2px #ffffff73;
  }
`;

const Title = styled.div`
  padding: 2pt;
  color: rgba(255, 255, 255, 0.85);
  height: 16pt;
  width: 300px;
  background-color: #4b4b4b;
  display: flex;
  justify-content: center;
  border-top-left-radius: 4pt;
  border-top-right-radius: 4pt;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const NodeRenderDefault: FunctionComponent<NodeRenderProps> = memo(
  ({ id, inputs, outputs, label, registerDragHolder }) => (
    <NodeRenderRoot>
      <div
        style={{ display: "flex" }}
        ref={registerDragHolder}
        data-testid={NODE_DRAG_HOLDER(id)}
      >
        <Title>{label}</Title>
      </div>

      <Content className="io">
        <div
          className="Inputs"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {inputs?.map((input) => (
            <InputOutput key={input.id} port={input} type={PortType.INPUT} />
          ))}
        </div>
        <div
          className="Outputs"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {outputs?.map((output) => (
            <InputOutput key={output.id} port={output} type={PortType.OUTPUT} />
          ))}
        </div>
      </Content>
    </NodeRenderRoot>
  )
);
