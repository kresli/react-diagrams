import { Diagram } from "../../src";
import { useSchema } from "../../src/hooks";
import { render, screen, fireEvent } from "@testing-library/react";
import { DIAGRAM } from "../../src/testIds";

test("dummy", () => {
  expect(true).toBeTruthy();
});

// test("ref is registered in schema", async () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} />;
//   };
//   render(<App />);
//   const elem = await screen.findByTestId(DIAGRAM);
//   expect(elem).toBe(schema.canvas);
// });

// test("move", () => {
//   class MouseMoveEvent extends MouseEvent {
//     movementX: number;
//     movementY: number;
//     constructor(values: any) {
//       super("mousemove", values);
//       this.movementX = values.movementX;
//       this.movementY = values.movementY;
//     }
//   }
//   let schema!: ReturnType<typeof useSchema>;
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} />;
//   };
//   render(<App />);
//   expect(schema.position).toEqual([0, 0]);
//   fireEvent.mouseDown(schema.canvas!, { buttons: 1 });
//   fireEvent(
//     window,
//     new MouseMoveEvent({
//       buttons: 1,
//       movementX: 123,
//       movementY: 456,
//     })
//   );
//   expect(schema.position).toEqual([123, 456]);
// });

// test("zoom", () => {
//   let schema!: ReturnType<typeof useSchema>;
//   const App = () => {
//     const _schema = useSchema();
//     schema = _schema;
//     return <Diagram schema={_schema} />;
//   };
//   render(<App />);
//   expect(schema.scale).toBe(1);
//   expect(schema.position).toEqual([0, 0]);
//   fireEvent.wheel(schema.canvas!, { deltaY: 2, clientX: 100, clientY: 50 });
//   expect(schema.scale).toBe(1.002);
//   expect(schema.position).toEqual([-0.2, -0.1]);
// });
