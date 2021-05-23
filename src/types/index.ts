export interface SchemaPort {
  id: string;
}

export enum PortAlign {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface SchemaNode {
  id: string;
  data?: any;
  position: [number, number];
  inputs?: SchemaPort[];
  outputs?: SchemaPort[];
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
