import { render, fireEvent } from "@testing-library/react";
import { Diagram, ElementType, useSchema } from "../../src";
import { queryElement } from "../../src/functions";

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
  expect(queryElement(ElementType.LINK)).toBeNull();
  fireEvent.click(queryElement(ElementType.PORT, "port-b")!);
  expect(schema.dragLink).toEqual({
    end: [0, 0],
    start: [0, 0],
    portId: "port-b",
  });
  fireEvent(window, new MouseMoveEvent({ movementX: 100, movementY: 200 }));
  expect(schema.dragLink).toEqual({
    end: [100, 200],
    start: [0, 0],
    portId: "port-b",
  });
  expect(queryElement(ElementType.LINK)).toBeDefined();
  fireEvent.mouseDown(window, queryElement(ElementType.PORT, "port-b")!);
});
