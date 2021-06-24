import { validateSchema, createSchema } from "../../src/functions";

test("basic", () => {
  expect(validateSchema(createSchema())).toBe(true);
});

test("if non unique node id then throw", () => {
  const schema = createSchema({
    nodes: [
      { id: "node-1", position: [0, 0] },
      { id: "node-1", position: [0, 0] },
    ],
  });
  expect(() => validateSchema(schema)).toThrowError("nodes id must be unique");
});

test("if non unique port id then throw", () => {
  const schema = createSchema({
    nodes: [
      { id: "node-1", position: [0, 0], inputs: [{ id: "non-unique" }] },
      { id: "node-2", position: [0, 0], outputs: [{ id: "non-unique" }] },
    ],
  });
  expect(() => validateSchema(schema)).toThrowError("port id must be unique");
});
