import { useCallback, useState } from "react";
import { useDrag } from "../../src/hooks";
import { render, fireEvent, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

class MouseMoveEvent extends MouseEvent {
  movementX: number;
  movementY: number;
  constructor(values: any) {
    super("mousemove", values);
    this.movementX = values.movementX;
    this.movementY = values.movementY;
  }
}

test("simple", () => {
  const App = () => {
    const [[x, y], setMovement] = useState([0, 0]);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    useDrag(
      ref,
      useCallback(
        (movementX, movementY) => setMovement([movementX, movementY]),
        []
      )
    );

    return (
      <div>
        <div data-testid="element" ref={setRef}>
          {x}:{y}
        </div>
      </div>
    );
  };
  render(<App />);
  fireEvent.mouseDown(screen.getByTestId("element"), {
    buttons: 1,
  });

  fireEvent(
    window,
    new MouseMoveEvent({
      buttons: 1,
      movementX: 123,
      movementY: 456,
    })
  );
  expect(screen.getByTestId("element").innerHTML).toEqual("123:456");
  fireEvent.mouseUp(window);
  fireEvent(
    window,
    new MouseMoveEvent({
      buttons: 1,
      movementX: 0,
      movementY: 0,
    })
  );
  expect(screen.getByTestId("element").innerHTML).toEqual("123:456");
  fireEvent.mouseDown(screen.getByTestId("element"), {
    buttons: 2,
  });

  fireEvent(
    window,
    new MouseMoveEvent({
      buttons: 1,
      movementX: 123,
      movementY: 456,
    })
  );
  expect(screen.getByTestId("element").innerHTML).toEqual("123:456");
});

test("ignore if no ref", () => {
  const onDragging = jest.fn();
  renderHook(() => useDrag(null, onDragging));
  fireEvent.mouseDown(window, {
    buttons: 1,
  });
  fireEvent(
    window,
    new MouseMoveEvent({
      buttons: 1,
      movementX: 123,
      movementY: 456,
    })
  );
  expect(onDragging).not.toHaveBeenCalled();
});

test("dont drag if button not pressed", () => {
  const ref = document.createElement("div");
  const onDragging = jest.fn();
  renderHook(() => useDrag(ref, onDragging));
  fireEvent.mouseDown(ref, {
    buttons: 1,
  });
  fireEvent(
    window,
    new MouseMoveEvent({
      buttons: 0,
      movementX: 123,
      movementY: 456,
    })
  );
  expect(onDragging).not.toHaveBeenCalled();
});
