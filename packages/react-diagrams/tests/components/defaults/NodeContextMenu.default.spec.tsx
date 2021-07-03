import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  NodeContextMenuDefault,
  SchemaProvider,
  useSchema,
} from "../../../src";
import { CONTEXT_MENU_REMOVE_NODE_BUTTON } from "../../../src/testIds";

test("", () => {
  const onClose = jest.fn();
  const schema = renderHook(() =>
    useSchema({
      nodes: [{ id: "node-a", position: [0, 0] }],
    })
  ).result.current;
  schema.action = jest.fn();
  document.elementsFromPoint = jest.fn().mockReturnValue([]);
  render(
    <SchemaProvider schema={schema}>
      <NodeContextMenuDefault clientX={0} clientY={0} onClose={onClose} />
    </SchemaProvider>
  );
  fireEvent.click(screen.getByTestId(CONTEXT_MENU_REMOVE_NODE_BUTTON));
  expect(schema.action).toHaveBeenCalled();
});
