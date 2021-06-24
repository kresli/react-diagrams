import { clientToWorldPosition } from "../../src/functions";

test("basic", () => {
  const viewport = Object.assign(document.createElement("div"), {
    getBoundingClientRect: () => ({ left: 100, top: -50 }),
  });
  expect(clientToWorldPosition([25, 45], viewport, 1.4)).toEqual([
    -53.57142857142858, 67.85714285714286,
  ]);
});
