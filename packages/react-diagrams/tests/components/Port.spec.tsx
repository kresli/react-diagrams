import { Diagram, useSchema } from "../../src";
import { render } from "@testing-library/react";
test("basic", () => {
  let schema!: ReturnType<typeof useSchema>;
  const App = () => {
    schema = useSchema({
      nodes: [{ id: "node-a", position: [0, 0], inputs: [{ id: "port-a" }] }],
    });
    return <Diagram schema={schema} />;
  };
  const app = render(<App />);
  const port = app.container.querySelector(`[data-diagramelementid="port-a"]`);
  expect(port).toBeDefined();
});
