import { Schema } from "src/types";

export function validateSchema(schema: Schema) {
  const nodesId = schema.nodes.map(({ id }) => id);
  if (new Set(nodesId).size !== nodesId.length)
    throw new Error("nodes id must be unique");
  const portsId = schema.nodes
    .map((node) => [...(node.inputs || []), ...(node.outputs || [])])
    .flat()
    .map((port) => port.id);
  if (new Set(portsId).size !== portsId.length)
    throw new Error("port id must be unique");
  return true;
}
