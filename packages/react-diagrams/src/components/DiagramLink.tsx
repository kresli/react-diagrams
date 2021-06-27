import {
  FunctionComponent,
  useState,
  useMemo,
  memo,
  useLayoutEffect,
  useContext,
  useCallback,
} from "react";
import { ElementType, SchemaLink } from "../types";
import { LinkRenderDefault } from "../components";
import { useAction } from "../hooks";
import { getELementType, queryElements, SchemaActionType } from "../functions";
import { ScaleContext, ViewportRefContext } from "../context";
import React from "react";

const config = {
  attributes: true,
  attributeFilter: ["style"],
};

// @TODO optimize it
function useNodeObserver(elementId: string): [number, number] {
  const viewport = useContext(ViewportRefContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const scale = useContext(ScaleContext);
  useLayoutEffect(() => {
    const [element] = queryElements(ElementType.GATE, elementId);
    if (!element) return;
    const callback = () => {
      if (!element || !viewport) return;
      // @todo can we use clientToWorldPositionHere?
      const { left, top } = element.getBoundingClientRect();
      const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
      const x = (left - viewLeft) / scale;
      const y = (top - viewTop) / scale;
      setX(Math.round(x));
      setY(Math.round(y));
    };
    const observer = new MutationObserver(callback);
    const nodeElement = getNodeElement(element);
    if (!nodeElement) return;
    observer.observe(nodeElement, config);
    callback();
    return () => observer.disconnect();
  }, [elementId, scale, viewport]);
  return useMemo(() => [x, y], [x, y]);
}

export const DiagramLink: FunctionComponent<{ link: SchemaLink }> = memo(
  ({ link }) => {
    // const action = useAction();
    // const start = useNodeObserver(linkData.input);
    // const end = useNodeObserver(linkData.output);
    // const handleDoubleClick = useCallback(() => {
    //   action({ type: SchemaActionType.LINK_REMOVE, link: linkData });
    // }, [action, linkData]);
    const Render = useMemo(
      () => link.render || LinkRenderDefault,
      [link.render]
    );
    // const link = useMemo(() => {
    //   const { render, ...data } = linkData;
    //   return {
    //     ...data,
    //     start,
    //     end,
    //   };
    // }, [end, linkData, start]);

    return (
      <g pointerEvents="visible">
        <Render {...link} start={[50, 50]} end={[300, 300]} />
      </g>
    );
  }
);

function getNodeElement(portElement: HTMLElement): HTMLElement | null {
  let element = portElement.parentElement;
  while (element) {
    if (!element) return null;
    if (getELementType(element) === ElementType.NODE) return element;
    element = element.parentElement;
  }
  return null;
}
