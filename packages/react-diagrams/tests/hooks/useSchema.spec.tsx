import { act, renderHook } from "@testing-library/react-hooks";
import { ElementType, useSchema } from "../../src";
import { setElementId, setElementType } from "../../src/functions";

test("basic", () => {
  const { result } = renderHook(() => useSchema());
  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "addNode": [Function],
      "canvas": null,
      "clientToLocalPosition": [Function],
      "clientToNode": [Function],
      "dispatchAction": [Function],
      "dragLink": null,
      "elementsFromPoint": [Function],
      "links": Array [],
      "nodes": Array [],
      "position": Array [
        0,
        0,
      ],
      "removeNode": [Function],
      "scale": 1,
      "view": null,
    }
  `);
});

test("clientToLocalPosition", () => {
  const { result } = renderHook(() =>
    useSchema({
      viewRef: Object.assign(document.createElement("div"), {
        getBoundingClientRect: () => ({ left: 30, top: 60 }),
      }),
      scale: 1.5,
    })
  );
  expect(result.current.clientToLocalPosition(0, 0)).toEqual([-20, -40]);
});

test("clientToLocalPosition with no viewRef return [0,0]", () => {
  const { result } = renderHook(() => useSchema());
  expect(result.current.clientToLocalPosition(0, 0)).toEqual([0, 0]);
});

test("elementsFromPoint", () => {
  const canvas = setElementType(
    document.createElement("div"),
    ElementType.CANVAS
  );
  const gate = setElementType(document.createElement("div"), ElementType.GATE);
  const link = setElementType(document.createElement("div"), ElementType.LINK);
  const node = setElementType(document.createElement("div"), ElementType.NODE);
  const port = setElementType(document.createElement("div"), ElementType.PORT);
  const view = setElementType(document.createElement("div"), ElementType.VIEW);
  document.elementsFromPoint = jest
    .fn()
    .mockReturnValueOnce([
      canvas,
      document.createElement("div"),
      gate,
      document.createElement("div"),
      link,
      document.createElement("div"),
      node,
      document.createElement("div"),
      port,
      document.createElement("div"),
      view,
    ]);
  const { result } = renderHook(() => useSchema());
  expect(result.current.elementsFromPoint(0, 0)).toEqual([
    ElementType.CANVAS,
    ElementType.GATE,
    ElementType.LINK,
    ElementType.NODE,
    ElementType.PORT,
    ElementType.VIEW,
  ]);
});

test("clientToNode", () => {
  const element = setElementId(
    setElementType(document.createElement("div"), ElementType.NODE),
    "node-1"
  );
  document.elementsFromPoint = jest
    .fn()
    .mockReturnValueOnce([element, document.createElement("div")]);
  const { result } = renderHook(() =>
    useSchema({
      nodes: [{ id: "node-1", position: [0, 0] }],
    })
  );
  expect(result.current.clientToNode(0, 0)).toEqual([result.current.nodes[0]]);
});

test("addNode", () => {
  const { result } = renderHook(() => useSchema());
  expect(result.current.nodes).toHaveLength(0);
  act(() => result.current.addNode({ id: "node-1" }));
  expect(result.current.nodes).toHaveLength(1);
  expect(result.current.nodes[0].id).toBe("node-1");
});

test("removeNode", () => {
  const { result } = renderHook(() =>
    useSchema({
      nodes: [{ id: "node-1", position: [0, 0] }],
    })
  );
  expect(result.current.nodes).toHaveLength(1);
  act(() => result.current.removeNode(result.current.nodes[0]));
  expect(result.current.nodes).toHaveLength(0);
});