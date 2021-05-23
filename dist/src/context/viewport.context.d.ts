import { FunctionComponent } from "react";
declare type ViewportContextValue = [Element | null, (element: Element | null) => void];
export declare const ViewportProvider: FunctionComponent;
export declare const useViewport: () => ViewportContextValue;
export {};
