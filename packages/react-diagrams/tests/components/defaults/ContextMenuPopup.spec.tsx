import { fireEvent, screen, render } from "@testing-library/react";
import { ContextMenuPopup } from "../../../src";
import { CONTEXT_MENU_POPUP } from "../../../src/testIds";

test("basic", () => {
  const onClose = jest.fn();
  const testId = "my-id";
  render(
    <ContextMenuPopup clientX={0} clientY={0} onClose={onClose}>
      <div data-testid={testId} />
    </ContextMenuPopup>
  );
  expect(screen.getByTestId(testId)).toBeDefined();
});

test("dont close on mousedown if clicked on popup", () => {
  const onClose = jest.fn();
  const insideId = "inside";
  const outsideId = "outside";
  render(
    <>
      <div data-testid={outsideId} />
      <ContextMenuPopup clientX={0} clientY={0} onClose={onClose}>
        <div data-testid={insideId} />
      </ContextMenuPopup>
    </>
  );
  const element = screen.getByTestId(CONTEXT_MENU_POPUP);
  expect(element).toBeDefined();

  document.elementsFromPoint = jest.fn().mockReturnValue([element]);
  fireEvent.mouseDown(screen.getByTestId(insideId));
  expect(onClose).toHaveBeenCalledTimes(0);

  document.elementsFromPoint = jest.fn().mockReturnValue([]);
  fireEvent.click(screen.getByTestId(outsideId));
  expect(onClose).toHaveBeenCalledTimes(1);
});
