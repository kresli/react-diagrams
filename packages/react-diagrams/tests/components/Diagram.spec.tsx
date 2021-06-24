import { useSchema, Diagram, ElementType, ContextMenuProps } from "../../src";
import { fireEvent, render, screen } from "@testing-library/react";
import { setElementId, setElementType } from "../../src/functions";

test(`${ElementType.CANVAS}`, async () => {
  let schema!: ReturnType<typeof useSchema>;
  const contextMenuId = "my-context-menu";
  let contextMenuProps!: ContextMenuProps;
  const ContextMenu = (props: ContextMenuProps) => {
    contextMenuProps = props;
    return <div data-testid={contextMenuId}>my context</div>;
  };
  const App = () => {
    const _schema = useSchema();
    schema = _schema;
    return <Diagram schema={_schema} contextMenu={ContextMenu} />;
  };
  render(<App />);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
  document.elementsFromPoint = jest
    .fn()
    .mockReturnValue([
      setElementType(document.createElement("div"), ElementType.CANVAS),
    ]);
  fireEvent.contextMenu(schema.canvas!);
  await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
  expect(contextMenuProps).toEqual({
    element: {
      type: ElementType.CANVAS,
    },
    worldX: 0,
    worldY: 0,
  });
});

test(`${ElementType.PORT}`, async () => {
  let schema!: ReturnType<typeof useSchema>;
  const contextMenuId = "my-context-menu";
  let contextMenuProps!: ContextMenuProps;
  const ContextMenu = (props: ContextMenuProps) => {
    contextMenuProps = props;
    return <div data-testid={contextMenuId}>my context</div>;
  };
  const App = () => {
    const _schema = useSchema();
    schema = _schema;
    return <Diagram schema={_schema} contextMenu={ContextMenu} />;
  };
  render(<App />);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
  document.elementsFromPoint = jest
    .fn()
    .mockReturnValue([
      setElementType(document.createElement("div"), ElementType.PORT),
    ]);
  fireEvent.contextMenu(schema.canvas!);
  await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
  expect(contextMenuProps).toEqual({
    element: {
      type: ElementType.PORT,
    },
    worldX: 0,
    worldY: 0,
  });
});

test(`${ElementType.LINK}`, async () => {
  let schema!: ReturnType<typeof useSchema>;
  const contextMenuId = "my-context-menu";
  let contextMenuProps!: ContextMenuProps;
  const ContextMenu = (props: ContextMenuProps) => {
    contextMenuProps = props;
    return <div data-testid={contextMenuId}>my context</div>;
  };
  const App = () => {
    const _schema = useSchema();
    schema = _schema;
    return <Diagram schema={_schema} contextMenu={ContextMenu} />;
  };
  render(<App />);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
  document.elementsFromPoint = jest
    .fn()
    .mockReturnValue([
      setElementType(document.createElement("div"), ElementType.LINK),
    ]);
  fireEvent.contextMenu(schema.canvas!);
  await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
  expect(contextMenuProps).toEqual({
    element: {
      type: ElementType.LINK,
    },
    worldX: 0,
    worldY: 0,
  });
});

test(`${ElementType.NODE}`, async () => {
  let schema!: ReturnType<typeof useSchema>;
  const contextMenuId = "my-context-menu";
  let contextMenuProps!: ContextMenuProps;
  const ContextMenu = (props: ContextMenuProps) => {
    contextMenuProps = props;
    return <div data-testid={contextMenuId}>my context</div>;
  };
  const App = () => {
    const _schema = useSchema({
      nodes: [{ id: "node-1", position: [0, 0] }],
    });
    schema = _schema;
    return <Diagram schema={_schema} contextMenu={ContextMenu} />;
  };
  render(<App />);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
  const element = setElementId(
    setElementType(document.createElement("div"), ElementType.NODE),
    "node-1"
  );
  document.elementsFromPoint = jest.fn().mockReturnValue([element]);
  fireEvent.contextMenu(schema.canvas!);
  await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
  expect(contextMenuProps).toEqual({
    element: {
      type: ElementType.NODE,
      node: schema.nodes[0],
    },
    worldX: 0,
    worldY: 0,
  });
});
test("trhow if non existing type", async () => {
  let schema!: ReturnType<typeof useSchema>;
  const contextMenuId = "my-context-menu";
  const ContextMenu = (props: ContextMenuProps) => {
    return <div data-testid={contextMenuId}>my context</div>;
  };
  const App = () => {
    const _schema = useSchema();
    schema = _schema;
    return <Diagram schema={_schema} contextMenu={ContextMenu} />;
  };
  render(<App />);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
  document.elementsFromPoint = jest.fn().mockReturnValue([]);
  fireEvent.contextMenu(schema.canvas!);
  await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
});
