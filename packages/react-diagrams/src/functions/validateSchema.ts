import { Schema } from "../types";

export function validateSchema(schema: Schema) {
  validateNodes(schema);
  validatePorts(schema);
  return true;
}

export function validateNodes(schema: Schema) {
  const nodesId = schema.nodes.map(({ id }) => id);
  if (new Set(nodesId).size !== nodesId.length)
    throw new Error("nodes id must be unique");
  return true;
}

export function validatePorts(schema: Schema) {
  const portsIds = schema.nodes
    .map(({ inputs = [], outputs = [] }) => [...inputs, ...outputs])
    .flat()
    .map(({ id }) => id);
  if (portsIds.length !== new Set(portsIds).size)
    throw new Error(`port id must be unique`);
  return true;
}
