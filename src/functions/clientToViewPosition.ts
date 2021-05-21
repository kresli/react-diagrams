export const clientToViewPosition = (
  viewLayerRef: Element,
  clientX: number,
  clientY: number,
  scale: number
): [number, number] => {
  if (!viewLayerRef) return [0, 0];
  const { left, top } = viewLayerRef.getBoundingClientRect();

  return [(clientX - left) / scale, (clientY - top) / scale];
};
