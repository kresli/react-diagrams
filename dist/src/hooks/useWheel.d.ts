export declare function useWheel(onZoom: (data: {
    deltaY: number;
    clientX: number;
    clientY: number;
}) => void): (element: HTMLElement) => void;
