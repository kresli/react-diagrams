import { render, fireEvent, screen } from "@testing-library/react";
import { Diagram, useSchema } from "../../src";
import { DRAG_LINK, LINK, PORT } from "../../src/testIds";

class MouseMoveEvent extends MouseEvent {
  movementX: number;
  movementY: number;
  constructor(values: any) {
    super("mousemove", values);
    this.movementX = values.movementX;
    this.movementY = values.movementY;
  }
}

test("basic", () => {
  let schema!: ReturnType<typeof useSchema>;
  const App = () => {
    schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
      ],
      links: [],
    });
    return <Diagram schema={schema} />;
  };
  render(<App />);
  // expect(queryElement(ElementType.LINK)).toBeNull();
  // expect(screen.getByTestId(LINKS_CANVAS).childElementCount).toBe(0);
  fireEvent.click(screen.getByTestId(PORT("port-a"))!);
  expect(schema.dragLink).toEqual({
    end: [0, 0],
    start: [0, 0],
    portId: "port-a",
  });
  expect(screen.getByTestId(DRAG_LINK)).toBeDefined();
  fireEvent(window, new MouseMoveEvent({ movementX: 100, movementY: 200 }));
  expect(schema.dragLink).toEqual({
    end: [100, 200],
    start: [0, 0],
    portId: "port-a",
  });
  // expect(screen.getByTestId(LINKS_CANVAS).childElementCount).toBe(0);
  fireEvent.click(screen.getByTestId(PORT("port-b"))!);
  // fireEvent.mouseDown(window, queryElement(ElementType.PORT, "port-b")!);
  const id = LINK({ output: "port-a", input: "port-b" });
  expect(screen.getByTestId(id)).toBeDefined();
});
