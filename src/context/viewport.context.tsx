// import {
//   createContext,
//   FunctionComponent,
//   useContext,
//   useMemo,
//   useState,
// } from "react";
// type ViewportContextValue = [Element | null, (element: Element | null) => void];

// const ViewportContext = createContext<ViewportContextValue>(null as any);
// export const ViewportProvider: FunctionComponent = ({ children }) => {
//   const [viewportRef, setViewportRef] = useState<Element | null>(null);
//   const value: ViewportContextValue = useMemo(() => {
//     console.log(viewportRef);
//     return [viewportRef, setViewportRef];
//   }, [viewportRef]);
//   return (
//     <ViewportContext.Provider value={value}>
//       {children}
//     </ViewportContext.Provider>
//   );
// };

// export const useViewport = () => useContext(ViewportContext);
export {};
