import { Schema } from "src/types";
import { validateSchema } from "../validateSchema";

test("throw error on dublicated node id", () => {
  const schema: Schema = {
    links: [],
    nodes: [
      { id: "0", position: [0, 0] },
      { id: "0", position: [0, 0] },
    ],
    position: [0, 0],
    scale: 1,
  };
  expect(() => validateSchema(schema)).toThrowError();
});
test("don't throw if all unique node id", () => {
  const schema: Schema = {
    links: [],
    nodes: [
      { id: "0", position: [0, 0] },
      { id: "1", position: [0, 0] },
    ],
    position: [0, 0],
    scale: 1,
  };
  expect(() => validateSchema(schema)).not.toThrowError();
  expect(validateSchema(schema)).toBeTruthy();
});
test("throw error on dublicated ports id", () => {
  const schema: Schema = {
    links: [],
    nodes: [
      { id: "0", position: [0, 0], inputs: [{ id: "0" }] },
      { id: "1", position: [0, 0], outputs: [{ id: "0" }] },
    ],
    position: [0, 0],
    scale: 1,
  };
  expect(() => validateSchema(schema)).toThrowError();
});
test("don't throw if all unique ports id", () => {
  const schema: Schema = {
    links: [],
    nodes: [
      { id: "0", position: [0, 0], inputs: [{ id: "0" }] },
      { id: "1", position: [0, 0], outputs: [{ id: "1" }] },
    ],
    position: [0, 0],
    scale: 1,
  };
  expect(() => validateSchema(schema)).not.toThrowError();
  expect(validateSchema(schema)).toBeTruthy();
});
