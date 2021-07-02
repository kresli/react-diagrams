import { render, fireEvent, screen } from "@testing-library/react";
import { Diagram, useSchema } from "../../src";
import { LINK } from "../../src/testIds";

test("basic", async () => {
  const App = () => {
    const schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
      ],
      links: [{ input: "port-b", output: "port-a" }],
    });
    return <Diagram schema={schema} />;
  };
  render(<App />);
  const val = screen.getByTestId(LINK({ output: "port-a", input: "port-b" }));
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
      links: [{ input: "port-b", output: "port-a" }],
    });
    schema = _schema;
    return <Diagram schema={schema} />;
  };
  render(<App />);
  const link = screen.getByTestId(LINK({ output: "port-a", input: "port-b" }));
  expect(link).toBeDefined();
  fireEvent.doubleClick(link);
  expect(schema.links).toHaveLength(0);
});
