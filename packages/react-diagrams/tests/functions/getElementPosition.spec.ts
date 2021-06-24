import { getElementPosition } from "../../src/functions";

test("basic", () => {
  const viewport = Object.assign(document.createElement("div"), {
    getBoundingClientRect() {
      return { left: 40, top: 20 };
    },
  });
  const element = Object.assign(document.createElement("div"), {
    getBoundingClientRect() {
      return { left: -20, top: 10 };
    },
  });
  expect(getElementPosition(viewport, element, 0.5)).toEqual([-120, -20]);
});
