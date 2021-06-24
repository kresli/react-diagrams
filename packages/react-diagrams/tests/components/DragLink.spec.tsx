import { render, fireEvent } from "@testing-library/react";
import { Diagram, useSchema } from "../../src";

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
    const _schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
      ],
      links: [],
    });
    schema = _schema;
    return <Diagram schema={_schema} />;
  };
  const app = render(<App />);
  expect(
    app.container.querySelector(`[data-diagramelementtype="LINK"]`)
  ).toBeNull();
  const startPort = app.container.querySelector(
    `[data-diagramelementid="port-b"]`
  );
  fireEvent.click(startPort!);
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
  const link = app.container.querySelector(`[data-diagramelementtype="LINK"]`);
  expect(link).toBeDefined();
  const endPort = app.container.querySelector(
    `[data-diagramelementid="port-b"]`
  );
  expect(endPort).toBeDefined();
  fireEvent.mouseDown(window, endPort!);
  expect(schema.dragLink).toBeNull();
});
