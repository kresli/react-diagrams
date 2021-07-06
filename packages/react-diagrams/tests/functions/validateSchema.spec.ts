import { validateSchema, createSchema } from "../../src/functions";

test("basic", () => {
  expect(validateSchema(createSchema())).toBe(true);
});
