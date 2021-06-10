import {
  FunctionComponent,
  useState,
  useMemo,
  memo,
  useLayoutEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { ElementType, SchemaLink } from "../types";
import { LinkRenderDefault } from "../components";
import { useAction, useRegisterElement } from "../hooks";
import { getELementType, SchemaActionType } from "../functions";
import { ScaleContext, ViewportRefContext } from "../context";

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
    const element = document.getElementById(elementId);
    console.log(elementId);
    if (!element) return;
    const callback = () => {
      if (!element || !viewport) return;
      const { left, top } = element.getBoundingClientRect();
      const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
      const x = (left - viewLeft) / scale;
      const y = (top - viewTop) / scale;
      setX(Math.round(x));
      setY(Math.round(y));
    };
    const observer = new MutationObserver(callback);
    observer.observe(getNodeElement(element)!, config);
    callback();
    return () => observer.disconnect();
  }, [elementId, scale, viewport]);
  return useMemo(() => [x, y], [x, y]);
}

export const DiagramLink: FunctionComponent<{ link: SchemaLink }> = memo(
  ({ link: linkData }) => {
    const action = useAction();
    const [inputId] = useState(() => `GATE_${linkData.input}`);
    const [outputId] = useState(() => `GATE_${linkData.output}`);
    const start = useNodeObserver(inputId);
    const end = useNodeObserver(outputId);
    const handleDoubleClick = useCallback(() => {
      action({ type: SchemaActionType.LINK_REMOVE, link: linkData });
    }, [action, linkData]);
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
    const lineRef = useRef<SVGLineElement>(null);
    useRegisterElement(lineRef, ElementType.LINK);
    return (
      <g pointerEvents="visible" onDoubleClick={handleDoubleClick}>
        <Render {...link} lineRef={lineRef} />
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
