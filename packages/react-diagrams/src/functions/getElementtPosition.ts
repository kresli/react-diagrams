// @todo rename to getElementWorldPosition
export function getElementPosition<
  V extends HTMLElement,
  E extends HTMLElement
>(viewport: V, element: E, scale: number): [number, number] {
  const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
  const { left: elemLeft, top: elemTop } = element.getBoundingClientRect();
  // @todo can we use clientToWorldPositionHere?

  const x = (elemLeft - viewLeft) / scale;
  const y = (elemTop - viewTop) / scale;
  return [x, y];
}
