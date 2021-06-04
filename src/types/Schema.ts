import { FunctionComponent, MutableRefObject } from "react";

export interface SchemaPort {
  id: string;
}

export enum PortAlign {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface RenderPortProps extends SchemaPort {
  key: string;
}

export interface NodeRenderProps {
  inputs?: RenderPortProps[];
  outputs?: RenderPortProps[];
  data?: any;
}
export type DiagramNodeRender = FunctionComponent<NodeRenderProps>;

export interface LinkRenderProps<T extends SVGElement = any> {
  input: string;
  output: string;
  data?: any;
  start: [number, number];
  end: [number, number];
  lineRef: MutableRefObject<T | null>;
}

export type SchemaLinkRender = FunctionComponent<LinkRenderProps>;

export type Position = [number, number];

export interface SchemaNode {
  id: string;
  data?: any;
  position: [number, number];
  inputs?: SchemaPort[];
  outputs?: SchemaPort[];
  render?: DiagramNodeRender;
}
export interface SchemaLink {
  input: string;
  output: string;
  data?: any;
  render?: SchemaLinkRender;
}
export interface RegisteredElement {
  element: HTMLOrSVGElement;
  type: ElementType;
  data?: any;
}
export type RegisteredElements = Map<HTMLOrSVGElement, RegisteredElement>;

export enum DragLinkDirection {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
}

export interface DragLink {
  direction: DragLinkDirection;
  start: Position;
  end: Position;
  portId: string;
}

export interface Schema {
  dragLink: DragLink | null;
  registeredElements: RegisteredElements;
  viewRef: null | HTMLDivElement;
  canvasRef: null | HTMLDivElement;
  position: [number, number];
  scale: number;
  nodes: SchemaNode[];
  links: SchemaLink[];
}

export enum ElementType {
  CANVAS = "CANVAS",
  LINK = "LINK",
  NODE = "NODE",
  PORT = "PORT",
  VIEW = "VIEW",
}
