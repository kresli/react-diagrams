import { createContext } from "react";
import { DragLink, SchemaLink, SchemaNode } from "../types";

export const NodesContext = createContext<SchemaNode[]>([]);
export const LinksContext = createContext<SchemaLink[]>([]);
export const ScaleContext = createContext(1);
export const PositionContext = createContext<[number, number]>([0, 0]);
export const ViewportRefContext = createContext<HTMLDivElement | null>(null);
export const DragLinkContext = createContext<DragLink | null>(null);
