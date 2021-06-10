import React, {
  FunctionComponent,
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import styled from "styled-components";
import {
  PortAlign,
  NodeRenderProps,
  SchemaPort,
  ElementType,
  DragLinkDirection,
} from "../types";
import { useAction, useDrag, useRegisterElement } from "../hooks";
import { SchemaActionType } from "../functions";

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
  &:hover {
    background-color: red;
  }
`;

const Port: FunctionComponent<{ port: SchemaPort; align: PortAlign }> = memo(
  ({ port, align }) => {
    const { id } = port;
    const action = useAction();
    const ref = useRef<HTMLDivElement | null>(null);
    useRegisterElement(ref, ElementType.PORT, id);
    useDrag(
      ref,
      useCallback(() => {}, [])
    );
    const onClick = useCallback(
      ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        action({
          type: SchemaActionType.CREATE_DRAGGING_LINK,
          clientX,
          clientY,
          portId: id,
          direction:
            align === PortAlign.RIGHT
              ? DragLinkDirection.FORWARD
              : DragLinkDirection.BACKWARD,
        });
      },
      [action, align, id]
    );

    useLayoutEffect(() => {
      ref.current?.addEventListener("mousedown", (ev) =>
        ev.stopImmediatePropagation()
      );
    }, []);

    useRegisterElement(ref, ElementType.GATE, id);

    return (
      <PortRoot align={align} ref={ref} onClick={onClick}>
        <div
          className="Gate"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
          }}
        />
      </PortRoot>
    );
  }
);

const InputOutput: FunctionComponent<{
  port: SchemaPort;
  align: PortAlign;
}> = memo(({ align, port }) => (
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
));

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
  ({ inputs, outputs }) => (
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
  )
);
