import {
  useSchema,
  Diagram,
  DiagramContextMenuDefault,
  ElementType,
} from "../../src";
import { fireEvent, screen, render } from "@testing-library/react";
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

test("drop is canceled on new node if mouse doesn't move before mouse down", () => {
  let schema!: ReturnType<typeof useSchema>;
  const App = () => {
    schema = useSchema();
    return <Diagram schema={schema} contextMenu={DiagramContextMenuDefault} />;
  };
  render(<App />);
  // create node from context menu
  document.elementsFromPoint = jest.fn().mockReturnValue([schema.canvas]);
  fireEvent.contextMenu(queryElement(ElementType.CANVAS)!);
  fireEvent.click(screen.getByTestId("BUTTON_ADD_NODE"));
  expect(schema.nodes).toHaveLength(1);
  // drag
  expect(schema.nodes[0].position).toEqual([0, 0]);
  fireEvent.mouseDown(queryElement(ElementType.NODE)!, { buttons: 1 });
  fireEvent(
    window,
    new MouseMoveEvent({ movementX: 10, movementY: 20, buttons: 1 })
  );
  expect(schema.nodes[0].position).toEqual([10, 20]);
  fireEvent.mouseUp(window);
  fireEvent(
    window,
    new MouseMoveEvent({ movementX: 20, movementY: 30, buttons: 0 })
  );
  expect(schema.nodes[0].position).toEqual([10, 20]);
});
