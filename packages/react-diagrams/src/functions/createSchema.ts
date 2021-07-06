import { Schema } from "../types";
import { validateSchema } from "./validateSchema";

export const createSchema = (schema?: Partial<Schema>): Schema => {
  const draft: Schema = {
    portNodePosition: {},
    dragLink: null,
    viewRef: null,
    canvasRef: null,
    registeredElements: new Map(),
    links: [],
    nodes: [],
    position: [0, 0],
    scale: 1,
    ...schema,
  };
  validateSchema(draft);
  return draft;
};
