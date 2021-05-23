import {
  memo,
  useState,
  CSSProperties,
  useCallback,
  useRef,
  useLayoutEffect,
  MutableRefObject,
} from 'react';
import { useViewport } from '../context';
import { SchemaActionType } from '../functions';
import { useAction, useDrag, useWheel, useContextMenu } from '../hooks';
import { ViewLayer } from './ViewLayer';
import React from 'react';

const ContextPopup = memo(() => {
  const handleCreate = useCallback(() => {}, []);
  return (
    <div>
      <button onClick={handleCreate}>create</button>
    </div>
  );
});

interface Props {
  ref?: MutableRefObject<HTMLDivElement | null>;
}

export const Canvas = memo<Props>(({ ref: scopeRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { ContextMenu, setContextTrigger } = useContextMenu(ContextPopup);
  const action = useAction();
  const setDragRef = useDrag((movementX, movementY) =>
    action({ type: SchemaActionType.VIEWPORT_MOVE, movementX, movementY })
  );
  const [viewLayer] = useViewport();
  const setZoomRef = useWheel(data => {
    if (viewLayer)
      action({ ...data, type: SchemaActionType.VIEWPORT_ZOOM, viewLayer });
  });
  const [style] = useState(
    () =>
      ({
        position: 'relative',
        background: 'green',
        width: '100%',
        height: '100%',
      } as CSSProperties)
  );
  // const setRef = useCallback(
  //   (element: HTMLDivElement) => {
  //     setDragRef(element);
  //     setZoomRef(element);
  //     setContextTrigger(element);
  //   },
  //   [setContextTrigger, setDragRef, setZoomRef]
  // );
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    setDragRef(element);
    setZoomRef(element);
    setContextTrigger(element);
    if (scopeRef) scopeRef.current = ref.current;
  }, []);
  return (
    <div className="Diagram" style={style} ref={ref}>
      <ContextMenu />
      <ViewLayer />
    </div>
  );
});
