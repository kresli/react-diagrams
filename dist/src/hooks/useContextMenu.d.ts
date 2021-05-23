import { FunctionComponent } from "react";
export declare const useContextMenu: (Popup: FunctionComponent) => {
    ContextMenu: () => JSX.Element;
    setContextTrigger: import("react").Dispatch<import("react").SetStateAction<HTMLElement | null>>;
};
