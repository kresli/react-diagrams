/// <reference types="react" />
declare type DragCallback = (movementX: number, movementY: number) => void;
export declare const useDrag: (onDragCb: DragCallback) => import("react").Dispatch<import("react").SetStateAction<HTMLDivElement | null>>;
export {};
