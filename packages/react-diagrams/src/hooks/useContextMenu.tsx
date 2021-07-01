export const useContextMenu = (
  ref: HTMLElement | null,
  onContextMenu: (ev: MouseEvent) => void
) => {
  const context = (ev: MouseEvent) => {
    ev.stopImmediatePropagation();
    ev.preventDefault();
    onContextMenu(ev);
  };
  ref?.addEventListener("contextmenu", context);
  return () => ref?.removeEventListener("contextmenu", context);
};
// import {
//   FunctionComponent,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { DiagramContextMenu } from "../components";
// import styled from "styled-components";
// import { createPortal } from "react-dom";

// const ContextMenuPopup = styled.div<{ clientX: number; clientY: number }>(
//   ({ clientX, clientY }) => ({
//     background: "white",
//     position: "fixed",
//     left: clientX,
//     top: clientY,
//     zIndex: 99999,
//   })
// );

// // @TODO: optimize
// export const useContextMenu = (
//   triggerRef: HTMLElement | null,
//   ContextContent: DiagramContextMenu
// ) => {
//   const [, setCmp] = useContext(ContextMenuContext);
//   const [position, setPosition] = useState<[number, number] | null>(null);
//   const contextMenu = useMemo(
//     () => () => {
//       if (!position) return <></>;
//       const [clientX, clientY] = position;
//       // return createPortal(
//       //   <ContextMenuPopup clientX={clientX} clientY={clientY}>
//       //     <ContextContent clientX={clientX} clientY={clientY} />
//       //   </ContextMenuPopup>,
//       //   document.body
//       // );
//       return (
//         <ContextMenuPopup clientX={clientX} clientY={clientY}>
//           <ContextContent clientX={clientX} clientY={clientY} />
//         </ContextMenuPopup>
//       );
//     },
//     [ContextContent, position]
//   );
//   useEffect(() => {
//     if (!triggerRef) return;
//     const onContextMenu = (ev: MouseEvent) => {
//       ev.stopImmediatePropagation();
//       ev.preventDefault();
//       setPosition([ev.clientX, ev.clientY]);
//       setCmp(contextMenu);
//     };
//     const onMouseDown = () => {
//       setPosition(null);
//       setCmp(null);
//     };
//     window.addEventListener("click", onMouseDown);
//     triggerRef.addEventListener("contextmenu", onContextMenu);
//     return () => {
//       triggerRef.removeEventListener("contextmenu", onContextMenu);
//       window.removeEventListener("click", onMouseDown);
//     };
//   }, [contextMenu, setCmp, triggerRef]);

//   // return () => contextMenu;
// };
