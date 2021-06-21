import { Position } from "../types";

export function clientToWorldPosition<V extends HTMLElement>(
  position: Position,
  viewport: V,
  scale: number
): [number, number] {
  const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
  const [elemLeft, elemTop] = position;

  const x = (elemLeft - viewLeft) / scale;
  const y = (elemTop - viewTop) / scale;
  return [x, y];
}
