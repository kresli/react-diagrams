import { ElementType } from "../../src";
import { queryElements } from "../../src/functions";

test("queryElement", () => {
  document.querySelectorAll = jest.fn();
  queryElements(ElementType.NODE);
  expect(document.querySelectorAll).toHaveBeenLastCalledWith(
    `[data-diagramelementtype="NODE"]`
  );
  queryElements(ElementType.NODE, "my-id");
  expect(document.querySelectorAll).toHaveBeenLastCalledWith(
    `[data-diagramelementtype="NODE"][data-diagramelementid="my-id"]`
  );
});
