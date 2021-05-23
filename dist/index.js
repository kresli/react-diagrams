import { createContext, useContext, useState, useMemo, useRef, useEffect, useCallback, memo, useReducer, useLayoutEffect } from 'react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';

const SchemaContext = createContext(null);
const SchemaActionContext = createContext(null);
const SchemaProvider = ({ children, schema, onChange }) => (jsx(SchemaActionContext.Provider, Object.assign({ value: onChange }, { children: jsx(SchemaContext.Provider, Object.assign({ value: schema }, { children: children }), void 0) }), void 0));

const ViewportContext = createContext(null);
const ViewportProvider = ({ children }) => {
    const [viewportRef, setViewportRef] = useState(null);
    const value = useMemo(() => {
        console.log(viewportRef);
        return [viewportRef, setViewportRef];
    }, [viewportRef]);
    return (jsx(ViewportContext.Provider, Object.assign({ value: value }, { children: children }), void 0));
};
const useViewport = () => useContext(ViewportContext);

const useAction = () => useContext(SchemaActionContext);

const useData = () => useContext(SchemaContext);

const useDrag = (onDragCb) => {
    const [ref, setRef] = useState(null);
    const onDrag = useRef(null);
    onDrag.current = onDragCb;
    useEffect(() => {
        if (!ref)
            return;
        let onMouseMove = () => { };
        const onMouseDown = (ev) => {
            if (ev.buttons !== 1)
                return;
            const mouseMove = (ev) => {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                if (!ev.buttons)
                    window.removeEventListener('mousemove', mouseMove);
                onDrag.current(ev.movementX, ev.movementY);
            };
            window.addEventListener('mousemove', mouseMove);
        };
        ref.addEventListener('mousedown', onMouseDown);
        return () => {
            ref.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [ref]);
    return setRef;
};

function useWheel(onZoom) {
    const zoom = useRef(onZoom);
    zoom.current = onZoom;
    return useCallback((element) => {
        if (!element)
            return;
        function onWheel({ deltaY, clientX, clientY }) {
            zoom.current({ deltaY, clientY, clientX });
        }
        element.addEventListener('wheel', onWheel);
    }, [onZoom]);
}

// @TODO: optimize
const useContextMenu = (Popup) => {
    const [triggerRef, setTriggerRef] = useState(null);
    const [visible, setVisible] = useState(null);
    useEffect(() => {
        if (!triggerRef)
            return;
        const onContextMenu = (ev) => {
            ev.stopImmediatePropagation();
            ev.preventDefault();
            setVisible([ev.clientX, ev.clientY]);
        };
        const onMouseDown = (ev) => {
            if (ev.buttons !== 1)
                return;
            setVisible(null);
        };
        window.addEventListener("mousedown", onMouseDown);
        triggerRef.addEventListener("contextmenu", onContextMenu);
        return () => {
            triggerRef.removeEventListener("contextmenu", onContextMenu);
            window.removeEventListener("mousedown", onMouseDown);
        };
    }, [triggerRef]);
    const ContextMenu = useMemo(() => {
        return () => (jsx(Fragment, { children: visible && (jsx(ContextMenuPopup, Object.assign({ x: visible[0], y: visible[1] }, { children: jsx(Popup, {}, void 0) }), void 0)) }, void 0));
    }, [Popup, visible]);
    return useMemo(() => ({
        ContextMenu,
        setContextTrigger: setTriggerRef,
    }), [ContextMenu]);
};
const ContextMenuPopup = memo(({ children, x, y }) => {
    return (jsx("div", Object.assign({ style: {
            background: "white",
            position: "fixed",
            left: x,
            top: y,
            zIndex: 99999,
        } }, { children: children }), void 0));
});

function createSchema(schema) {
    return schema;
}

var SchemaActionType;
(function (SchemaActionType) {
    SchemaActionType["VIEWPORT_MOVE"] = "VIEWPORT_MOVE";
    SchemaActionType["VIEWPORT_ZOOM"] = "VIEWPORT_ZOOM";
    SchemaActionType["NODE_MOVE"] = "NODE_MOVE";
})(SchemaActionType || (SchemaActionType = {}));
const schemaReducer = (schema, action) => {
    switch (action.type) {
        case SchemaActionType.VIEWPORT_MOVE: {
            const { movementX, movementY } = action;
            const [left, top] = schema.position;
            const position = [left + movementX, top + movementY];
            return {
                ...schema,
                position,
            };
        }
        case SchemaActionType.NODE_MOVE: {
            const { node, movementX, movementY, scale } = action;
            const [x, y] = node.position;
            const nodes = schema.nodes.map(n => n.id === node.id
                ? {
                    ...n,
                    position: [x + movementX / scale, y + movementY / scale],
                }
                : n);
            return {
                ...schema,
                nodes,
            };
        }
        case SchemaActionType.VIEWPORT_ZOOM: {
            const { deltaY, clientX, clientY, viewLayer } = action;
            if (!viewLayer)
                return schema;
            const factor = schema.scale * 0.1;
            const scaleChange = deltaY < 0 ? -factor : factor;
            const scale = schema.scale + scaleChange;
            if (scale <= 0.1)
                return schema;
            const { left, top } = viewLayer.getBoundingClientRect();
            const rootLeft = left - schema.position[0];
            const rootTop = top - schema.position[1];
            const x = left - rootLeft - (clientX - left) * (scaleChange / schema.scale);
            const y = top - rootTop - (clientY - top) * (scaleChange / schema.scale);
            const position = [x, y];
            return {
                ...schema,
                position,
                scale,
            };
        }
        default:
            return schema;
    }
};

function validateSchema(schema) {
    const nodesId = schema.nodes.map(({ id }) => id);
    if (new Set(nodesId).size !== nodesId.length)
        throw new Error('nodes id must be unique');
    const portsId = schema.nodes
        .map(node => [...(node.inputs || []), ...(node.outputs || [])])
        .flat()
        .map(port => port.id);
    if (new Set(portsId).size !== portsId.length)
        throw new Error('port id must be unique');
    return true;
}

const useSchema = (initSchema) => {
    validateSchema(initSchema);
    const [schema, onChange] = useReducer(schemaReducer, initSchema);
    const actions = useMemo(() => ({
        onChange,
    }), []);
    return [schema, actions];
};

var PortAlign;
(function (PortAlign) {
    PortAlign["LEFT"] = "LEFT";
    PortAlign["RIGHT"] = "RIGHT";
})(PortAlign || (PortAlign = {}));

const Port = memo(({ port }) => {
    const { id } = port;
    return (jsx("div", Object.assign({ className: "Port", style: {
            width: "1rem",
            height: "1rem",
            background: "grey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        } }, { children: jsx("div", { id: `GATE_${id}`, className: "Gate", style: { width: 2, height: 2, background: "black" } }, void 0) }), void 0));
});
const InputOutput = memo(({ align, port }) => {
    return (jsx("div", Object.assign({ className: "InputOutput", style: {
            background: "red",
            flex: 1,
            display: "flex",
            justifyContent: align === PortAlign.LEFT ? "flex-start" : "flex-end",
        } }, { children: jsx(Port, { port: port }, void 0) }), void 0));
});
const DiagramNode = memo(({ node }) => {
    const { position, outputs, inputs, id } = node;
    const [left, top] = position;
    const action = useAction();
    const { scale } = useData();
    // const { setElementType } = useContext(MouseEventsContext);
    const setRef = useDrag((movementX, movementY) => action({
        type: SchemaActionType.NODE_MOVE,
        node,
        movementX,
        movementY,
        scale,
    }));
    return (jsxs("div", Object.assign({ "data-node": id, className: "DiagramNode", ref: setRef, style: {
            position: "absolute",
            left,
            top,
            border: "1px solid black",
            background: "blue",
            width: "5rem",
            cursor: "default",
        } }, { children: [jsx("div", { children: "title" }, void 0),
            jsxs("div", Object.assign({ className: "io", style: {
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                } }, { children: [jsx("div", Object.assign({ className: "Inputs", style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        } }, { children: inputs === null || inputs === void 0 ? void 0 : inputs.map((input) => (jsx(InputOutput, { port: input, align: PortAlign.LEFT }, input.id))) }), void 0),
                    jsx("div", Object.assign({ className: "Outputs", style: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        } }, { children: outputs === null || outputs === void 0 ? void 0 : outputs.map((output) => (jsx(InputOutput, { port: output, align: PortAlign.RIGHT }, output.id))) }), void 0)] }), void 0)] }), void 0));
});

const NodesLayer = memo(() => {
    const schema = useData();
    const nodes = useMemo(() => schema.nodes.map((node) => jsx(DiagramNode, { node: node }, node.id)), [schema.nodes]);
    return (jsx("div", Object.assign({ className: "nodesLayer", style: { position: "absolute" } }, { children: nodes }), void 0));
});

const config = {
    attributes: true,
    attributeFilter: ["style"],
};
// @TODO optimize it
function useElementPosition(elementId) {
    const [viewport] = useViewport();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const { scale } = useData();
    useLayoutEffect(() => {
        const element = document.getElementById(elementId);
        if (!element)
            return;
        const callback = () => {
            if (!element || !viewport)
                return;
            const { left, top } = element.getBoundingClientRect();
            const { left: viewLeft, top: viewTop } = viewport.getBoundingClientRect();
            const x = (left - viewLeft) / scale;
            const y = (top - viewTop) / scale;
            setX(x);
            setY(y);
        };
        const observer = new MutationObserver(callback);
        observer.observe(getNodeElement(element), config);
        callback();
        return () => observer.disconnect();
    }, [elementId, scale, viewport]);
    return useMemo(() => [x, y], [x, y]);
}
const DiagramLink = memo(({ input, output }) => {
    const [inputId] = useState(() => `GATE_${input}`);
    const [outputId] = useState(() => `GATE_${output}`);
    const [startX, startY] = useElementPosition(inputId);
    const [endX, endY] = useElementPosition(outputId);
    return (jsx("line", { id: `LINK_${input}${output}`, x1: startX, y1: startY, x2: endX, y2: endY, stroke: "black" }, void 0));
});
function getNodeElement(portElement) {
    let element = portElement.parentElement;
    while (element) {
        if (!element)
            return null;
        if (element.dataset.node)
            return element;
        element = element.parentElement;
    }
    return null;
}

const LinksLayer = memo(() => {
    const schema = useData();
    const links = useMemo(() => schema.links.map((link) => (jsx(DiagramLink, Object.assign({}, link), `${link.input}${link.output}`))), [schema.links]);
    return (jsx("svg", Object.assign({ className: "LinksLayer", style: {
            position: "absolute",
            pointerEvents: "none",
            width: 1,
            height: 1,
            overflow: "overlay",
        } }, { children: links }), void 0));
});

const ViewLayer = memo(() => {
    const schema = useData();
    const [, setViewportRef] = useViewport();
    const { position, scale } = schema;
    const [left, top] = position;
    const viewLayerStyle = useMemo(() => ({
        position: "absolute",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        left,
        top,
    }), [left, top, scale]);
    // useCanvasMouse();
    return (jsxs("div", Object.assign({ className: "viewLayer", style: viewLayerStyle, ref: setViewportRef }, { children: [jsx(NodesLayer, {}, void 0),
            jsx(LinksLayer, {}, void 0)] }), void 0));
});

const ContextPopup = memo(() => {
    const handleCreate = useCallback(() => { }, []);
    return (jsx("div", { children: jsx("button", Object.assign({ onClick: handleCreate }, { children: "create" }), void 0) }, void 0));
});
const Canvas = memo(({ ref: scopeRef }) => {
    const ref = useRef(null);
    const { ContextMenu, setContextTrigger } = useContextMenu(ContextPopup);
    const action = useAction();
    const setDragRef = useDrag((movementX, movementY) => action({ type: SchemaActionType.VIEWPORT_MOVE, movementX, movementY }));
    const [viewLayer] = useViewport();
    const setZoomRef = useWheel((data) => {
        if (viewLayer)
            action({ ...data, type: SchemaActionType.VIEWPORT_ZOOM, viewLayer });
    });
    const [style] = useState(() => ({
        position: "relative",
        background: "green",
        width: "100%",
        height: "100%",
    }));
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
        if (!element)
            return;
        setDragRef(element);
        setZoomRef(element);
        setContextTrigger(element);
        if (scopeRef)
            scopeRef.current = ref.current;
    }, []);
    return (jsxs("div", Object.assign({ className: "Diagram", style: style, ref: ref }, { children: [jsx(ContextMenu, {}, void 0),
            jsx(ViewLayer, {}, void 0)] }), void 0));
});

const Diagram = memo(({ schema, onChange, ref }) => {
    return (jsx(ViewportProvider, { children: jsx(SchemaProvider, Object.assign({ schema: schema, onChange: onChange }, { children: jsx(Canvas, { ref: ref }, void 0) }), void 0) }, void 0));
});

export { Canvas, Diagram, DiagramLink, DiagramNode, LinksLayer, NodesLayer, PortAlign, ViewLayer, createSchema, useSchema };
