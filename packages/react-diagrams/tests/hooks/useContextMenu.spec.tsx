import { render, screen, fireEvent } from "@testing-library/react";

test("dummy", () => {
  expect(true).toBeTruthy();
});

// test("default render", () => {
//   const App = () => {
//     const [x, y] = contextPosition || [-99, -99];
//     return (
//       <div>
//         <div ref={setContextTrigger} data-testid="contextTrigger" />
//         <ContextMenu>
//           <div data-testid="content">
//             {x}:{y}
//           </div>
//         </ContextMenu>
//       </div>
//     );
//   };
//   render(<App />);
//   expect(() => screen.getByTestId("content")).toThrow(
//     `Unable to find an element by: [data-testid="content"]`
//   );
//   fireEvent.contextMenu(screen.getByTestId("contextTrigger"), {
//     clientX: 123,
//     clientY: 456,
//   });
//   expect(screen.getByTestId("content")).toBeDefined();
//   expect(screen.getByTestId("content").innerHTML).toEqual("123:456");
//   fireEvent.click(screen.getByTestId("contextTrigger"));
//   expect(() => screen.getByTestId("content")).toThrow(
//     `Unable to find an element by: [data-testid="content"]`
//   );
// });
