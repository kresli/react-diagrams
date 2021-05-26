import { FunctionComponent, memo, useRef } from "react";
import styled from "styled-components";
import { PortAlign, NodeRenderProps, SchemaPort } from "../types";
import { ElementType, useRegisterElement } from "./ElementType";

const PortRoot = styled.div<{ align: PortAlign }>`
  width: 12px;
  height: 12px;
  background: rgb(98, 98, 98);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 100%;
  top: 4px;
  left: ${({ align }) => (align === PortAlign.LEFT ? "-26px" : "auto")};
  right: ${({ align }) => (align === PortAlign.RIGHT ? "-26px" : "auto")};
`;

const Port: FunctionComponent<{ port: SchemaPort; align: PortAlign }> = memo(
  ({ port, align }) => {
    const { id } = port;
    const ref = useRef<HTMLDivElement | null>(null);
    useRegisterElement(ref, ElementType.PORT);
    return (
      <PortRoot align={align} ref={ref}>
        <div
          id={`GATE_${id}`}
          className="Gate"
          style={{
            position: "absolute",
            width: 2,
            height: 2,
          }}
        />
      </PortRoot>
    );
  }
);

const InputOutput: FunctionComponent<{
  port: SchemaPort;
  align: PortAlign;
}> = memo(({ align, port }) => {
  return (
    <div
      className="InputOutput"
      style={{
        flex: 1,
        display: "flex",
        position: "relative",
        minHeight: 20,
        justifyContent: align === PortAlign.LEFT ? "flex-start" : "flex-end",
      }}
    >
      <Port port={port} align={align} />
    </div>
  );
});

const NodeRenderRoot = styled.div`
  background-color: #2d2d2d;
  border-radius: 4pt;
  &:hover {
    box-shadow: 0 0 8px 4px #ffffff54;
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
  ({ inputs, outputs }) => {
    return (
      <NodeRenderRoot>
        <Title>title</Title>
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
              <InputOutput key={input.id} port={input} align={PortAlign.LEFT} />
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
              <InputOutput
                key={output.id}
                port={output}
                align={PortAlign.RIGHT}
              />
            ))}
          </div>
        </Content>
      </NodeRenderRoot>
    );
  }
);
