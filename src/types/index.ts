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

export interface RenderProps {
  inputs?: RenderPortProps[];
  outputs?: RenderPortProps[];
  data?: any;
}

export type SchemaNodeRender = FunctionComponent<RenderProps>;

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
}
export interface Schema {
  position: [number, number];
  scale: number;
  nodes: SchemaNode[];
  links: SchemaLink[];
}
