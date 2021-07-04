import { FunctionComponent } from "react";

export interface SchemaPort {
  id: string;
  label?: string;
}

interface RenderPortProps extends SchemaPort {
  key: string;
}

export interface NodeRenderProps {
  id: string;
  inputs?: SchemaPort[];
  outputs?: SchemaPort[];
  label?: string;
  data?: any;
  registerDragHolder: (element: HTMLElement | null) => void;
}
export type DiagramNodeRender = FunctionComponent<NodeRenderProps>;

export interface LinkRenderProps<T extends SVGElement = any> {
  data?: any;
  start: [number, number];
  end: [number, number];
  // lineRef: MutableRefObject<T | null>;
}

export type SchemaLinkRender = FunctionComponent<LinkRenderProps>;

export type Position = [number, number];

export interface SchemaNode {
  id: string;
  data?: any;
  label?: string;
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
}
export type RegisteredElements = Map<HTMLOrSVGElement, RegisteredElement>;

export enum DragLinkDirection {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
}

export enum PortType {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export interface SchemaDragLink {
  start: Position;
  end: Position;
  portId: string;
}

export interface Schema {
  dragLink: SchemaDragLink | null;
  registeredElements: RegisteredElements;
  portNodePosition: Record<string, Position>;
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
  GATE = "GATE",
}
