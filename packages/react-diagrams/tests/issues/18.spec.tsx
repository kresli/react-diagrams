import { useSchema, Diagram, ElementType } from "../../src";
import { render, fireEvent } from "@testing-library/react";
import { queryElement } from "../../src/functions";

test("create link on dargLink end", async () => {
  let schema!: ReturnType<typeof useSchema>;
  const App = () => {
    schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "out-a" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "in-a" }] },
      ],
    });
    return <Diagram schema={schema} />;
  };
  render(<App />);

  const portOut = queryElement(ElementType.PORT, "out-a")!;
  expect(portOut).toBeDefined();
  const portIn = queryElement(ElementType.PORT, "in-a")!;
  expect(portIn).toBeDefined();

  expect(schema.links).toHaveLength(0);
  expect(schema.dragLink).toBeNull();
  fireEvent.click(portOut);
  expect(schema.dragLink).not.toBeNull();
  fireEvent.click(portIn);
  expect(schema.links).toHaveLength(1);
  expect(schema.dragLink).toBeNull();
});
