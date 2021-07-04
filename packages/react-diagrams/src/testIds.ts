export const NODE_DRAG_HOLDER = (id: string) => `NODE_${id}_DRAG_HOLDER`;
export const DIAGRAM = "DIAGRAM";

export const CONTEXT_MENU_ADD_NODE_BUTTON = "CONTEXT_MENU_ADD_NODE_BUTTON";
export const CONTEXT_MENU_REMOVE_NODE_BUTTON =
  "CONTEXT_MENU_REMOVE_NODE_BUTTON";
export const PORT = (id: string) => `PORT_${id}`;
export const LINK = ({ input, output }: { input: string; output: string }) =>
  `LINK_${output}_${input}`;
export const NODE = (id: string) => `NODE_${id}`;
export const LINKS_CANVAS = "LINKS_CANVAS";
export const DRAG_LINK = "DRAG_LINK";
export const CONTEXT_MENU_POPUP = "CONTEXT_MENU_POPUP";
