import { Schema } from "../types";

export const createSchema = (schema?: Partial<Schema>): Schema => ({
  dragLink: null,
  viewRef: null,
  canvasRef: null,
  registeredElements: new Map(),
  links: [],
  nodes: [],
  position: [0, 0],
  scale: 1,
  ...schema,
});
