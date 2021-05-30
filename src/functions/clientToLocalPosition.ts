interface Config {
  clientX: number;
  clientY: number;
  scale: number;
  view: HTMLDivElement;
}
/**
 * Convert client coordinates to local. Local coordinates are scaled and
 * positioned against viewport position
 * @param config
 * @returns
 */
export const clientToLocalPosition = (config: Config): [number, number] => {
  const { clientX, clientY, scale, view } = config;
  const { left, top } = view.getBoundingClientRect();
  return [(clientX - left) / scale, (clientY - top) / scale];
};
