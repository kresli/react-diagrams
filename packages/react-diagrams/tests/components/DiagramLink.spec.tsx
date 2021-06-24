import { render, fireEvent } from "@testing-library/react";
import { Diagram, useSchema } from "../../src";

test("basic", async () => {
  const App = () => {
    const schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
      ],
      links: [{ input: "port-a", output: "port-b" }],
    });
    return <Diagram schema={schema} />;
  };
  const app = render(<App />);
  const val = app.container.querySelector(`[data-diagramelementtype="LINK"]`);
  expect(val).toBeDefined();
});

test("double click removes link", async () => {
  let schema!: ReturnType<typeof useSchema>;
  const App = () => {
    const _schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
      ],
      links: [{ input: "port-a", output: "port-b" }],
    });
    schema = _schema;
    return <Diagram schema={schema} />;
  };
  const app = render(<App />);
  const link = app.container.querySelector(`[data-diagramelementtype="LINK"]`)!;
  expect(link).toBeDefined();
  fireEvent.doubleClick(link);
  expect(schema.links).toHaveLength(0);
});
