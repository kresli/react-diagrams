import {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { NodesContext } from "../context";
import {
  SchemaAction,
  SchemaActionType,
  schemaReducer,
  validateSchema,
} from "../functions";
import { getElementId, getELementType } from "../functions/getElementType";
import {
  ElementType,
  RegisteredElement,
  RegisteredElements,
  Schema,
  SchemaNode,
} from "../types";

/*
- canvas + mousedown + mousemove = drag
- node + mousedown + mousemove = drag
- port + mousedown + mousemove = drag (new connection)
- how to clear connected port?
- CAN'T you must delete connection
*/

function useEvent<T extends Window, E extends keyof WindowEventMap>(
  ref: T | null,
  eventType: E,
  cb: (event: WindowEventMap[E]) => void
): void;
function useEvent<T extends HTMLElement, E extends keyof HTMLElementEventMap>(
  ref: T | null,
  eventType: E,
  cb: (event: HTMLElementEventMap[E]) => void
): void;
function useEvent<T extends HTMLElement | Window>(
  ref: T,
  eventType: string,
  cb: (event: any) => void
): void {
  useEffect(() => {
    if (!ref) return;
    ref.addEventListener(eventType, cb);
    return () => ref.removeEventListener(eventType, cb);
  }, [ref, cb, eventType]);
}

const elementsFromPoint = (clientX: number, clientY: number) =>
  (document.elementsFromPoint(clientX, clientY) as unknown) as (
    | HTMLElement
    | SVGElement
  )[];

const registeredElementsFromPoint = (
  clientX: number,
  clientY: number,
  registeredElements: RegisteredElements
) => {
  const registered: RegisteredElement[] = [];
  for (const element of elementsFromPoint(clientX, clientY)) {
    getELementType(element);
    const elem = registeredElements.get(element);
    if (elem) registered.push(elem);
  }
  return registered;
};

const useUserEvents = (
  canvasRef: HTMLDivElement | null,
  registeredElements: RegisteredElements,
  action: Dispatch<SchemaAction>
) => {
  const [dragElement, setDragElement] = useState<RegisteredElement | null>(
    null
  );

  useEvent(
    window,
    "mousemove",
    useCallback(
      ({ movementX, movementY }: MouseEvent) => {
        if (!dragElement) return;
        switch (dragElement.type) {
          case ElementType.CANVAS: {
            action({
              type: SchemaActionType.VIEWPORT_MOVE,
              movementX,
              movementY,
            });
            return;
          }
          case ElementType.NODE: {
            const registeredElement = dragElement;
            action({
              type: SchemaActionType.ELEMENT_MOVE,
              registeredElement,
              movementX,
              movementY,
            });
          }
        }
      },
      [action, dragElement]
    )
  );

  // useEvent(
  //   canvasRef,
  //   "dblclick",
  //   useCallback(({ clientX, clientY }) => {
  //     const registered = registeredElementsFromPoint(
  //       clientX,
  //       clientY,
  //       registeredElements
  //     );
  //     if (!registered.length) return;
  //     if()
  //   }, [])
  // );

  useEvent(
    canvasRef,
    "mousedown",
    useCallback(
      ({ clientX, clientY }: MouseEvent) => {
        const registered = registeredElementsFromPoint(
          clientX,
          clientY,
          registeredElements
        );
        if (!registered.length) return;
        switch (true) {
          case registered[0].type === ElementType.NODE: {
            setDragElement(registered[0]);
            return;
          }
          case registered[0].type === ElementType.CANVAS: {
            setDragElement(registered[0]);
            return;
          }
        }
      },
      [registeredElements]
    )
  );

  useEvent(
    canvasRef,
    "mouseup",
    useCallback(() => {
      setDragElement(null);
    }, [])
  );

  useEvent(
    canvasRef,
    "wheel",
    useCallback(
      ({ deltaY, clientX, clientY }) => {
        action({
          type: SchemaActionType.VIEWPORT_ZOOM,
          deltaY,
          clientY,
          clientX,
        });
      },
      [action]
    )
  );
};
export const useSchema = (initSchema: Schema) => {
  validateSchema(initSchema);

  const [
    { links, nodes, position, scale, viewRef, canvasRef, registeredElements },
    dispatchAction,
  ] = useReducer(schemaReducer, initSchema);

  useUserEvents(canvasRef, registeredElements, dispatchAction);

  const clientToLocalPosition = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      if (!viewRef) return [0, 0];
      const { left, top } = viewRef.getBoundingClientRect();
      return [(clientX - left) / scale, (clientY - top) / scale];
    },
    [scale, viewRef]
  );

  const clientToNode = useCallback(
    (clientX: number, clientY: number): SchemaNode[] => {
      return document
        .elementsFromPoint(clientX, clientY)
        .map((elem) => {
          const type = getELementType(elem as HTMLElement);
          if (type !== ElementType.NODE) return null;
          return nodes.find(
            ({ id }) => id === getElementId(elem as HTMLElement)
          );
        })
        .filter((v) => v) as SchemaNode[];
    },
    [nodes]
  );

  const addNode = (node: Partial<SchemaNode>) => {
    dispatchAction({ type: SchemaActionType.ADD_NODE, node });
  };

  const removeNode = (node: SchemaNode) => {
    dispatchAction({ type: SchemaActionType.REMOVE_NODE, node });
  };

  const elementsFromPoint = useCallback(
    (clientX: number, clientY: number): ElementType[] => {
      console.log(document.elementsFromPoint(clientX, clientY));
      return document
        .elementsFromPoint(clientX, clientY)
        .map((elem) => {
          return getELementType(elem as HTMLElement);
        })
        .filter((v) => v) as ElementType[];
    },
    []
  );

  return useMemo(
    () => ({
      dispatchAction,
      elementsFromPoint,
      clientToLocalPosition,
      clientToNode,
      addNode,
      removeNode,
      nodes,
      links,
      scale,
      position,
      view: viewRef,
    }),
    [
      clientToLocalPosition,
      clientToNode,
      elementsFromPoint,
      links,
      nodes,
      position,
      scale,
      viewRef,
    ]
  );
};

export type Ctx = ReturnType<typeof useSchema>;
