import { ElementType } from "../../src";
import {
  createSchema,
  getElementId,
  SchemaActionType,
  schemaReducer,
} from "../../src/functions";
const {
  VIEWPORT_MOVE,
  VIEWPORT_ZOOM,
  NODE_MOVE,
  ADD_NODE,
  REMOVE_NODE,
  LINK_CREATE,
  LINK_REMOVE,
  REGISTER_ELEMENT_TYPE,
  CREATE_DRAGGING_LINK,
  MOVE_DRAGGING_LINK,
  DELETE_DRAGGING_LINK,
} = SchemaActionType;

test(`Action ${VIEWPORT_MOVE}`, () => {
  const schema = createSchema({
    position: [-5, -10],
  });
  const action = {
    type: VIEWPORT_MOVE,
    movementX: 10,
    movementY: 20,
  } as const;
  const { position } = schemaReducer(schema, action);
  expect(position).toEqual([5, 10]);
});
test(`Action ${NODE_MOVE}`, () => {
  const schema = createSchema({
    nodes: [
      { id: "node-a", position: [-5, -10] },
      { id: "node-b", position: [13, 11] },
    ],
    scale: 0.5,
  });
  const action = {
    type: NODE_MOVE,
    movementX: 10,
    movementY: 20,
    node: schema.nodes[0],
  } as const;
  const [nodeA, nodeB] = schemaReducer(schema, action).nodes;
  expect(nodeA.position).toEqual([15, 30]);
  expect(nodeB.position).toEqual([13, 11]);
});
test(`Action ${VIEWPORT_ZOOM}`, () => {
  const schema = createSchema({
    viewRef: Object.assign(document.createElement("div"), {
      getBoundingClientRect: () => ({ left: -20, top: 15 }),
    }),
    scale: 0.5,
    position: [10, 20],
  });
  const action = {
    type: VIEWPORT_ZOOM,
    deltaY: 1,
    clientX: 20,
    clientY: 30,
  } as const;
  const { position, scale } = schemaReducer(schema, action);
  expect(position).toEqual([9.96, 19.985]);
  expect(scale).toEqual(0.5005);
});
test(`Action ${VIEWPORT_ZOOM} returns same if no viewRef`, () => {
  const schema = createSchema({
    viewRef: null,
  });
  const action = {
    type: VIEWPORT_ZOOM,
    deltaY: 2,
    clientX: 20,
    clientY: 30,
  } as const;
  expect(schemaReducer(schema, action)).toBe(schema);
});
test(`Action ${VIEWPORT_ZOOM} bale if scale is 0.1 and we want to zoom out (min scale 0.1)`, () => {
  const schema = createSchema({
    viewRef: Object.assign(document.createElement("div")),
    scale: 0.1,
    position: [10, 20],
  });
  const action = {
    type: VIEWPORT_ZOOM,
    deltaY: -1,
    clientX: 20,
    clientY: 30,
  } as const;
  const reduced = schemaReducer(schema, action);
  expect(reduced.scale).toEqual(0.1);
  expect(reduced).toBe(schema);
});
test(`Action ${VIEWPORT_ZOOM} min scale is 0.1`, () => {
  const schema = createSchema({
    viewRef: Object.assign(document.createElement("div"), {
      getBoundingClientRect: () => ({ left: -20, top: 15 }),
    }),
    scale: 0.5,
    position: [10, 20],
  });
  const action = {
    type: VIEWPORT_ZOOM,
    deltaY: -99,
    clientX: 20,
    clientY: 30,
  } as const;
  const { scale } = schemaReducer(schema, action);
  expect(scale).toEqual(0.4505);
});
test(`Action ${ADD_NODE}`, () => {
  const schema = createSchema();
  const action = {
    type: ADD_NODE,
    node: { id: "node_1" },
  } as const;
  expect(schemaReducer(schema, action).nodes).toHaveLength(1);
});
test(`Action ${REMOVE_NODE}`, () => {
  const schema = createSchema({
    nodes: [{ id: "node_1", position: [0, 0] }],
  });
  const action = {
    type: REMOVE_NODE,
    node: schema.nodes[0],
  } as const;
  expect(schemaReducer(schema, action).nodes).toHaveLength(0);
});
test(`Action ${REMOVE_NODE} removes connected links too`, () => {
  const schema = createSchema({
    nodes: [
      { id: "node_1", position: [0, 0], outputs: [{ id: "port-1" }] },
      {
        id: "node_2",
        position: [0, 0],
        inputs: [{ id: "port-2" }],
        outputs: [{ id: "port-3" }],
      },
      { id: "node_3", position: [0, 0], inputs: [{ id: "port-4" }] },
    ],
    links: [
      { output: "port-1", input: "port-2" },
      { output: "port-3", input: "port-4" },
    ],
  });
  const action = {
    type: REMOVE_NODE,
    node: schema.nodes[1],
  } as const;
  const { nodes, links } = schemaReducer(schema, action);
  expect(nodes).toHaveLength(2);
  expect(links).toHaveLength(0);
});
test(`Action ${REGISTER_ELEMENT_TYPE} create`, () => {
  const schema = createSchema();
  expect(schema.registeredElements.size).toBe(0);
  const reduced = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    register: true,
    elementType: ElementType.NODE,
    element: document.createElement("div"),
  });
  expect(reduced.registeredElements.size).toBe(1);
});

test(`Action ${REGISTER_ELEMENT_TYPE} create with id`, () => {
  const schema = createSchema();
  expect(schema.registeredElements.size).toBe(0);
  const element = document.createElement("div");
  const reduced = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    id: "node_1",
    register: true,
    elementType: ElementType.NODE,
    element,
  });
  expect(reduced.registeredElements.size).toBe(1);
  expect(getElementId(element)).toBe("node_1");
});
test(`Action ${REGISTER_ELEMENT_TYPE} delete`, () => {
  let schema = createSchema();
  const element = document.createElement("div");
  expect(schema.registeredElements.size).toBe(0);
  schema = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    register: true,
    elementType: ElementType.NODE,
    element,
  });
  expect(schema.registeredElements.size).toBe(1);
  schema = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    register: false,
    elementType: ElementType.NODE,
    element,
  });
  expect(schema.registeredElements.size).toBe(0);
});
test(`Action ${REGISTER_ELEMENT_TYPE} - ${ElementType.CANVAS}`, () => {
  let schema = createSchema();
  const element = document.createElement("div");
  expect(schema.registeredElements.size).toBe(0);
  expect(schema.canvasRef).toBeNull();
  schema = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    register: true,
    elementType: ElementType.CANVAS,
    element,
  });
  expect(schema.registeredElements.size).toBe(1);
  expect(schema.canvasRef).toBe(element);
});
test(`Action ${REGISTER_ELEMENT_TYPE} - ${ElementType.VIEW}`, () => {
  let schema = createSchema();
  const element = document.createElement("div");
  expect(schema.registeredElements.size).toBe(0);
  expect(schema.canvasRef).toBeNull();
  schema = schemaReducer(schema, {
    type: REGISTER_ELEMENT_TYPE,
    register: true,
    elementType: ElementType.VIEW,
    element,
  });
  expect(schema.registeredElements.size).toBe(1);
  expect(schema.viewRef).toBe(element);
});

test(`Action ${LINK_REMOVE}`, () => {
  let schema = createSchema({
    nodes: [
      { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
      { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
    ],
    links: [{ output: "port-a", input: "port-b" }],
  });
  expect(schema.nodes).toHaveLength(2);
  expect(schema.links).toHaveLength(1);
  schema = schemaReducer(schema, {
    type: LINK_REMOVE,
    link: schema.links[0],
  });
  expect(schema.nodes).toHaveLength(2);
  expect(schema.links).toHaveLength(0);
});
test(`Action ${LINK_CREATE}`, () => {
  let schema = createSchema({
    nodes: [
      { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
      { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
    ],
  });
  expect(schema.nodes).toHaveLength(2);
  expect(schema.links).toHaveLength(0);
  schema = schemaReducer(schema, {
    type: LINK_CREATE,
    input: "port-a",
    output: "port-b",
  });
  expect(schema.nodes).toHaveLength(2);
  expect(schema.links).toHaveLength(1);
});
test(`Action ${CREATE_DRAGGING_LINK} from input`, () => {
  let schema = createSchema({
    viewRef: document.createElement("div"),
    nodes: [
      { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
      { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
    ],
  });
  expect(schema.dragLink).toBeNull();
  schema = schemaReducer(schema, {
    type: CREATE_DRAGGING_LINK,
    clientX: 40,
    clientY: 40,
    portId: "port-a",
  });
  expect(schema.dragLink).toEqual({
    end: [40, 40],
    portId: "port-a",
    start: [40, 40],
  });
  schema = schemaReducer(schema, {
    type: CREATE_DRAGGING_LINK,
    clientX: 80,
    clientY: 80,
    portId: "port-b",
  });
  expect(schema.dragLink).toBeNull();
});
test(`Action ${CREATE_DRAGGING_LINK} from output`, () => {
  let schema = createSchema({
    viewRef: document.createElement("div"),
    nodes: [
      { id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] },
      { id: "node-b", position: [0, 0], inputs: [{ id: "port-b" }] },
    ],
  });
  expect(schema.dragLink).toBeNull();
  schema = schemaReducer(schema, {
    type: CREATE_DRAGGING_LINK,
    clientX: 40,
    clientY: 40,
    portId: "port-b",
  });
  expect(schema.dragLink).toEqual({
    end: [40, 40],
    portId: "port-b",
    start: [40, 40],
  });
  schema = schemaReducer(schema, {
    type: CREATE_DRAGGING_LINK,
    clientX: 80,
    clientY: 80,
    portId: "port-a",
  });
  expect(schema.dragLink).toBeNull();
});
test(`Action ${CREATE_DRAGGING_LINK} bail if no viewRef`, () => {
  const schema = createSchema({
    viewRef: null,
  });
  expect(schema.dragLink).toBeNull();
  const reduced = schemaReducer(schema, {
    type: CREATE_DRAGGING_LINK,
    clientX: 40,
    clientY: 40,
    portId: "port-a",
  });
  expect(reduced.dragLink).toBeNull();
  expect(reduced).toBe(schema);
});
test(`Action ${MOVE_DRAGGING_LINK} bail if no dragLink`, () => {
  const schema = createSchema();
  expect(schema.dragLink).toBeNull();
  const reduced = schemaReducer(schema, {
    type: MOVE_DRAGGING_LINK,
    movementX: 40,
    movementY: 40,
  });
  expect(reduced).toBe(schema);
  expect(reduced.dragLink).toBeNull();
});
test(`Action ${MOVE_DRAGGING_LINK}`, () => {
  let schema = createSchema({
    dragLink: {
      end: [40, 40],
      portId: "port-a",
      start: [40, 40],
    },
    nodes: [{ id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] }],
  });
  schema = schemaReducer(schema, {
    type: MOVE_DRAGGING_LINK,
    movementX: 10,
    movementY: 20,
  });
  expect(schema.dragLink).toEqual({
    portId: "port-a",
    start: [40, 40],
    end: [50, 60],
  });
});
test(`Action ${DELETE_DRAGGING_LINK}`, () => {
  let schema = createSchema({
    dragLink: {
      end: [40, 40],
      portId: "port-a",
      start: [40, 40],
    },
    nodes: [{ id: "node-a", position: [0, 0], outputs: [{ id: "port-a" }] }],
  });
  expect(schema.dragLink).not.toBeNull();
  schema = schemaReducer(schema, {
    type: DELETE_DRAGGING_LINK,
  });
  expect(schema.dragLink).toBeNull();
});
test("not existing action trhow error", () => {
  const action: any = { type: "__THIS_WILL_FAIL__" };
  const schema = createSchema();
  expect(() => schemaReducer(schema, action)).toThrowError(
    `${action.type} is not registered action.`
  );
});
