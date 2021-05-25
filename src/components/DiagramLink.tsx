import {
  FunctionComponent,
  useState,
  useMemo,
  memo,
  useLayoutEffect,
} from "react";
import { useViewport } from "../context";
import { useData } from "../hooks";
import { SchemaLink } from "../types";
import { LinkRenderDefault } from "./LinkRender.default";

const config = {
  attributes: true,
  attributeFilter: ["style"],
};

// @TODO optimize it
function useElementPosition(elementId: string): [number, number] {
  const [viewport] = useViewport();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { scale } = useData();
  useLayoutEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const callback = () => {
      if (!element || !viewport) return;
      const { left, top } = element.getBoundingClientRect();
      const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
      const x = (left - viewLeft) / scale;
      const y = (top - viewTop) / scale;
      setX(x);
      setY(y);
    };
    const observer = new MutationObserver(callback);
    observer.observe(getNodeElement(element)!, config);
    callback();
    return () => observer.disconnect();
  }, [elementId, scale, viewport]);
  return useMemo(() => [x, y], [x, y]);
}

export const DiagramLinkDefault: FunctionComponent<SchemaLink> = memo(
  (linkData) => {
    const [inputId] = useState(() => `GATE_${linkData.input}`);
    const [outputId] = useState(() => `GATE_${linkData.output}`);
    const start = useElementPosition(inputId);
    const end = useElementPosition(outputId);
    const Render = useMemo(() => linkData.render || LinkRenderDefault, [
      linkData.render,
    ]);
    const link = useMemo(() => {
      const { render, ...data } = linkData;
      return {
        ...data,
        start,
        end,
      };
    }, [end, linkData, start]);
    return <Render {...link} />;
  }
);

function getNodeElement(portElement: HTMLElement): HTMLElement | null {
  let element = portElement.parentElement;
  while (element) {
    if (!element) return null;
    if (element.dataset.node) return element;
    element = element.parentElement;
  }
  return null;
}
