import { Schema } from "../types";

export function validateSchema(schema: Schema) {
  validateNodes(schema);
  validatePorts(schema);
  validateLinks(schema);
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

export function validateLinks(schema: Schema) {
  const inputPorts = new Set<string>();
  const outputPorts = new Set<string>();
  schema.nodes.forEach(({ inputs, outputs }) => {
    inputs?.forEach(({ id }) => inputPorts.add(id));
    outputs?.forEach(({ id }) => outputPorts.add(id));
  });
  schema.links.forEach(({ input, output }) => {
    if (!inputPorts.has(input)) throw new Error(`"${input}" not registered`);
    if (!outputPorts.has(output)) throw new Error(`"${output}" not registered`);
  });
  return true;
}
