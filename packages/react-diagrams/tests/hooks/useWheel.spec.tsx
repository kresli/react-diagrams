import { renderHook } from "@testing-library/react-hooks";
import { useWheel } from "../../src/hooks";
import { fireEvent } from "@testing-library/react";

test("basic", () => {
  const onWheel = jest.fn();
  const ref = document.createElement("div");
  const wheelEvent = new MouseEvent("wheel");
  renderHook(() => useWheel(ref, onWheel));
  fireEvent(ref, wheelEvent);
  expect(onWheel).toHaveBeenCalledWith(wheelEvent);
});

test("ignore wheel if no ref assigned", () => {
  const onWheel = jest.fn();
  const wheelEvent = new MouseEvent("wheel");
  renderHook(() => useWheel(null, onWheel));
  fireEvent(window, wheelEvent);
  expect(onWheel).not.toHaveBeenCalled();
});
