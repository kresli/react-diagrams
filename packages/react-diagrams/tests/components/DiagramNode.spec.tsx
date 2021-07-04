import { useSchema, Diagram } from "../../src";
import { screen, render, fireEvent } from "@testing-library/react";
import { NODE_DRAG_HOLDER } from "../../src/testIds";
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
      nodes: [{ id: "node-a", position: [0, 0] }],
    });
    return <Diagram schema={schema} />;
  };
  render(<App />);
  // const node = app.container.querySelector(`[data-diagramelementid="node-a"]`);
  const node = screen.getByTestId(NODE_DRAG_HOLDER("node-a"));
  expect(node).toBeDefined();
  fireEvent.mouseDown(node!, { buttons: 1 });
  fireEvent(
    window,
    new MouseMoveEvent({ movementX: 10, movementY: 20, buttons: 1 })
  );
  expect(schema.nodes[0].position).toEqual([10, 20]);
});
