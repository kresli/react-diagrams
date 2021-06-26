import {
  ContextMenuProps,
  Diagram,
  DiagramContextMenu,
  DiagramContextMenuDefault,
  ElementType,
  useSchema,
} from "../../src";
import { fireEvent, render, screen } from "@testing-library/react";
import { queryElement, queryElements } from "../../src/functions";
test("basic", () => {
  let schema!: ReturnType<typeof useSchema>;
  const Ctx: DiagramContextMenu = (props) => {
    return (
      <div data-testid="context-menu">
        <DiagramContextMenuDefault {...props} />
      </div>
    );
  };
  const App = () => {
    schema = useSchema();
    return <Diagram schema={schema} contextMenu={Ctx} />;
  };
  render(<App />);
  document.elementsFromPoint = jest.fn().mockReturnValue([schema.canvas]);
  const elem = queryElement(ElementType.CANVAS)!;
  fireEvent.contextMenu(elem);
  expect(screen.getByTestId("context-menu")).toBeDefined();
});

test(`${ElementType.CANVAS} - add node`, () => {
  let schema!: ReturnType<typeof useSchema>;
  const Ctx: DiagramContextMenu = (props) => {
    return (
      <div data-testid="context-menu">
        <DiagramContextMenuDefault {...props} />
      </div>
    );
  };
  const App = () => {
    schema = useSchema();
    return <Diagram schema={schema} contextMenu={Ctx} />;
  };
  render(<App />);
  document.elementsFromPoint = jest.fn().mockReturnValue([schema.canvas]);
  const elem = queryElement(ElementType.CANVAS)!;
  fireEvent.contextMenu(elem);
  const wrapper = screen.getByTestId("context-menu");
  expect(wrapper).toBeDefined();

  expect(wrapper).toMatchInlineSnapshot(`
    <div
      data-testid="context-menu"
    >
      <button
        data-testid="BUTTON_ADD_NODE"
      >
        create
      </button>
    </div>
  `);
  expect(schema.nodes).toHaveLength(0);
  fireEvent.click(screen.getByTestId("BUTTON_ADD_NODE"));
  expect(schema.nodes).toHaveLength(1);
});

test(`${ElementType.NODE} - remove node`, () => {
  let schema!: ReturnType<typeof useSchema>;
  const Ctx: DiagramContextMenu = (props) => {
    return (
      <div data-testid="context-menu">
        <DiagramContextMenuDefault {...props} />
      </div>
    );
  };
  const App = () => {
    schema = useSchema({
      nodes: [{ id: "node-a", position: [0, 0] }],
    });
    return <Diagram schema={schema} contextMenu={Ctx} />;
  };
  render(<App />);
  const elem = queryElement(ElementType.NODE, "node-a")!;
  document.elementsFromPoint = jest.fn().mockReturnValue([elem]);
  fireEvent.contextMenu(elem);
  const wrapper = screen.getByTestId("context-menu");
  expect(wrapper).toMatchInlineSnapshot(`
    <div
      data-testid="context-menu"
    >
      <button
        data-testid="BUTTON_NODE_REMOVE"
      >
        remove node
      </button>
    </div>
  `);
  expect(schema.nodes).toHaveLength(1);
  fireEvent.click(screen.getByTestId("BUTTON_NODE_REMOVE"));
  expect(schema.nodes).toHaveLength(0);
});

test(`${ElementType.PORT}`, () => {
  let schema!: ReturnType<typeof useSchema>;
  const Ctx: DiagramContextMenu = (props) => {
    return (
      <div data-testid="context-menu">
        <DiagramContextMenuDefault {...props} />
      </div>
    );
  };
  const App = () => {
    schema = useSchema({
      nodes: [{ id: "node-a", position: [0, 0], inputs: [{ id: "input-a" }] }],
    });
    return <Diagram schema={schema} contextMenu={Ctx} />;
  };
  render(<App />);
  const elem = queryElement(ElementType.PORT, "input-a")!;
  document.elementsFromPoint = jest.fn().mockReturnValue([elem]);
  fireEvent.contextMenu(elem);
  const wrapper = screen.getByTestId("context-menu");
  expect(wrapper).toBeDefined();
  expect(wrapper).toMatchInlineSnapshot(`
    <div
      data-testid="context-menu"
    >
      <div>
        port
      </div>
    </div>
  `);
});

test(`${ElementType.LINK}`, () => {
  let schema!: ReturnType<typeof useSchema>;
  const Ctx: DiagramContextMenu = (props) => {
    return (
      <div data-testid="context-menu">
        <DiagramContextMenuDefault {...props} />
      </div>
    );
  };
  const App = () => {
    schema = useSchema({
      nodes: [
        { id: "node-a", position: [0, 0], outputs: [{ id: "out" }] },
        { id: "node-b", position: [0, 0], inputs: [{ id: "in" }] },
      ],
      links: [{ input: "out", output: "in" }],
    });
    return <Diagram schema={schema} contextMenu={Ctx} />;
  };
  render(<App />);
  const link = queryElement(ElementType.LINK)!;
  document.elementsFromPoint = jest.fn().mockReturnValue([link]);
  fireEvent.contextMenu(link);
  const wrapper = screen.getByTestId("context-menu");
  expect(wrapper).toBeDefined();
  expect(wrapper).toMatchInlineSnapshot(`
    <div
      data-testid="context-menu"
    >
      <div>
        link
      </div>
    </div>
  `);
});
