import { createSchema } from "../../src/functions";
test("dont throw error if link in correct direction", () => {
  expect(() =>
    createSchema({
      nodes: [
        { id: "node-1", position: [0, 0], inputs: [{ id: "in" }] },
        { id: "node-2", position: [0, 0], outputs: [{ id: "out" }] },
      ],
      links: [
        {
          input: "in",
          output: "out",
        },
      ],
    })
  ).not.toThrow();
});

test("throw error if link try connect with wrong direction", () => {
  expect(() =>
    createSchema({
      nodes: [
        { id: "node-1", position: [0, 0], inputs: [{ id: "in" }] },
        { id: "node-2", position: [0, 0], outputs: [{ id: "out" }] },
      ],
      links: [
        {
          input: "out",
          output: "in",
        },
      ],
    })
  ).toThrow();
});

test("if non unique node id then throw", () => {
  const schema = () =>
    createSchema({
      nodes: [
        { id: "node-1", position: [0, 0] },
        { id: "node-1", position: [0, 0] },
      ],
    });
  expect(schema).toThrowError("nodes id must be unique");
});

test("if non unique port id then throw", () => {
  const schema = () =>
    createSchema({
      nodes: [
        { id: "node-1", position: [0, 0], inputs: [{ id: "non-unique" }] },
        { id: "node-2", position: [0, 0], outputs: [{ id: "non-unique" }] },
      ],
    });
  expect(schema).toThrowError("port id must be unique");
});
