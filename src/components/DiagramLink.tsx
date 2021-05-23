import React from 'react';
import {
  FunctionComponent,
  useState,
  useMemo,
  memo,
  useLayoutEffect,
} from 'react';
import { useViewport } from '../context';
import { useData } from '../hooks';
import { SchemaLink } from '../types';

const config = {
  attributes: true,
  attributeFilter: ['style'],
};

// @TODO optimize it
function useElementPosition(elementId: string) {
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

export const DiagramLink: FunctionComponent<SchemaLink> = memo(
  ({ input, output }) => {
    const [inputId] = useState(() => `GATE_${input}`);
    const [outputId] = useState(() => `GATE_${output}`);
    const [startX, startY] = useElementPosition(inputId);
    const [endX, endY] = useElementPosition(outputId);
    return (
      <line
        id={`LINK_${input}${output}`}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="black"
      />
    );
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
