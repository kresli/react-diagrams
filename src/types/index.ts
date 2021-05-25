import { FunctionComponent } from "react";

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
export type SchemaNodeRender = FunctionComponent<NodeRenderProps>;

export interface LinkRenderProps {
  input: string;
  output: string;
  data?: any;
  start: [number, number];
  end: [number, number];
}

export type SchemaLinkRender = FunctionComponent<LinkRenderProps>;

export interface SchemaNode {
  id: string;
  data?: any;
  position: [number, number];
  inputs?: SchemaPort[];
  outputs?: SchemaPort[];
  render?: SchemaNodeRender;
}
export interface SchemaLink {
  input: string;
  output: string;
  data?: any;
  render?: SchemaLinkRender;
}
export interface Schema {
  position: [number, number];
  scale: number;
  nodes: SchemaNode[];
  links: SchemaLink[];
}
