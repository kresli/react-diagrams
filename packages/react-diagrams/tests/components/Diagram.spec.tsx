import { Diagram, OnContextTypeDataType } from "../../src/components";
import { render, fireEvent, screen } from "@testing-library/react";
import { Ctx, useSchema } from "../../src/hooks";
import { CONTEXT_MENU_POPUP, DIAGRAM, NODE } from "../../src/testIds";

test("node context", () => {
  let schema: Ctx;
  const App = () => {
    schema = useSchema({
      nodes: [{ id: "node-a", position: [0, 0] }],
    });
    return (
      <>
        <div data-testid="close-popup" />
        <Diagram schema={schema} />
      </>
    );
  };
  render(<App />);
  fireEvent.contextMenu(screen.queryByTestId(NODE("node-a"))!);
  expect(screen.queryByTestId(CONTEXT_MENU_POPUP)!).toBeDefined();
  fireEvent.click(screen.queryByTestId("close-popup")!);
  expect(screen.queryByTestId(CONTEXT_MENU_POPUP)!).toBeNull();
});

test("onContextMenu", () => {
  let schema: Ctx;
  const onContextMenu = jest.fn();
  const App = () => {
    schema = useSchema({
      nodes: [{ id: "node-a", position: [0, 0] }],
    });
    return <Diagram schema={schema} onContextMenu={onContextMenu} />;
  };
  render(<App />);
  expect(onContextMenu).not.toHaveBeenCalled();
  fireEvent.contextMenu(screen.queryByTestId(DIAGRAM)!);
  expect(onContextMenu).lastCalledWith({
    clientX: 0,
    clientY: 0,
    type: OnContextTypeDataType.CANVAS,
  });
  fireEvent.contextMenu(screen.queryByTestId(NODE("node-a"))!);
  expect(onContextMenu).lastCalledWith({
    clientX: 0,
    clientY: 0,
    type: OnContextTypeDataType.NODE,
  });
});

// test(`${ElementType.PORT}`, async () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const contextMenuId = "my-context-menu";
//   let contextMenuProps!: ContextMenuProps;
//   const ContextMenu = (props: ContextMenuProps) => {
//     contextMenuProps = props;
//     return <div data-testid={contextMenuId}>my context</div>;
//   };
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} contextMenu={ContextMenu} />;
//   };
//   render(<App />);
//   await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
//   document.elementsFromPoint = jest
//     .fn()
//     .mockReturnValue([
//       setElementType(document.createElement("div"), ElementType.PORT),
//     ]);
//   fireEvent.contextMenu(schema.canvas!);
//   await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
//   expect(contextMenuProps).toEqual({
//     element: {
//       type: ElementType.PORT,
//     },
//     worldX: 0,
//     worldY: 0,
//   });
// });

// test(`${ElementType.LINK}`, async () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const contextMenuId = "my-context-menu";
//   let contextMenuProps!: ContextMenuProps;
//   const ContextMenu = (props: ContextMenuProps) => {
//     contextMenuProps = props;
//     return <div data-testid={contextMenuId}>my context</div>;
//   };
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} contextMenu={ContextMenu} />;
//   };
//   render(<App />);
//   await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
//   document.elementsFromPoint = jest
//     .fn()
//     .mockReturnValue([
//       setElementType(document.createElement("div"), ElementType.LINK),
//     ]);
//   fireEvent.contextMenu(schema.canvas!);
//   await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
//   expect(contextMenuProps).toEqual({
//     element: {
//       type: ElementType.LINK,
//     },
//     worldX: 0,
//     worldY: 0,
//   });
// });

// test(`${ElementType.NODE}`, async () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const contextMenuId = "my-context-menu";
//   let contextMenuProps!: ContextMenuProps;
//   const ContextMenu = (props: ContextMenuProps) => {
//     contextMenuProps = props;
//     return <div data-testid={contextMenuId}>my context</div>;
//   };
//   const App = () => {
//     const _schema = useSchema({
//       nodes: [{ id: "node-1", position: [0, 0] }],
//     });
//     schema = _schema;
//     return <Diagram schema={_schema} contextMenu={ContextMenu} />;
//   };
//   render(<App />);
//   await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
//   const element = setElementId(
//     setElementType(document.createElement("div"), ElementType.NODE),
//     "node-1"
//   );
//   document.elementsFromPoint = jest.fn().mockReturnValue([element]);
//   fireEvent.contextMenu(schema.canvas!);
//   await expect(screen.findByTestId(contextMenuId)).resolves.toBeDefined();
//   expect(contextMenuProps).toEqual({
//     element: {
//       type: ElementType.NODE,
//       node: schema.nodes[0],
//     },
//     worldX: 0,
//     worldY: 0,
//   });
// });
// test("trhow if non existing type", async () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const contextMenuId = "my-context-menu";
//   const ContextMenu = (props: ContextMenuProps) => {
//     return <div data-testid={contextMenuId}>my context</div>;
//   };
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} contextMenu={ContextMenu} />;
//   };
//   render(<App />);
//   await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
//   document.elementsFromPoint = jest.fn().mockReturnValue([]);
//   fireEvent.contextMenu(schema.canvas!);
//   await expect(screen.findByTestId(contextMenuId)).rejects.toThrowError();
// });
