import { screen, render } from "@testing-library/react";
import { SchemaProvider, useSchema } from "../../src";
import { Ctx } from "../../src/hooks";
test("basic", () => {
  let schema!: Ctx;
  const App = () => {
    schema = useSchema();
    return (
      <SchemaProvider schema={schema}>
        <div data-testid="my-id" />
      </SchemaProvider>
    );
  };
  render(<App />);
  expect(screen.getByTestId("my-id")).toBeDefined();
});
