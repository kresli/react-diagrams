import { useSchema, Diagram } from "../../src";
import { fireEvent, screen, render } from "@testing-library/react";
import {
  DIAGRAM,
  NODE_DRAG_HOLDER,
  CONTEXT_MENU_ADD_NODE_BUTTON,
} from "../../src/testIds";

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
    return <Diagram schema={schema} />;
  };
  render(<App />);
  // create node from context menu
  expect(schema.nodes).toHaveLength(0);
  fireEvent.contextMenu(screen.getByTestId(DIAGRAM));
  fireEvent.click(screen.getByTestId(CONTEXT_MENU_ADD_NODE_BUTTON));
  expect(schema.nodes).toHaveLength(1);
  // drag
  expect(schema.nodes[0].position).toEqual([0, 0]);
  const nodeTestId = NODE_DRAG_HOLDER(schema.nodes[0].id);
  fireEvent.mouseDown(screen.getByTestId(nodeTestId)!, { buttons: 1 });
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
