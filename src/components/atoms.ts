import { atom } from "custom-react-context-state";
import { SchemaLink, SchemaNode } from "../types";

export const ViewportRefAtom = atom<HTMLDivElement | null>({
  defaultValue: null,
});

export const NodesAtom = atom<SchemaNode[]>({
  defaultValue: [],
});
export const LinksAtom = atom<SchemaLink[]>({
  key: "LinksAtom",
  defaultValue: [],
});
export const PositionAtom = atom<[number, number]>({
  defaultValue: [0, 0],
});
export const ScaleAtom = atom<number>({
  defaultValue: 1,
});
