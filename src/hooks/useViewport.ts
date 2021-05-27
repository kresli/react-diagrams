import { useContext } from "react";
import { SchemaViewportRefContext } from "../context";

export const useViewport = () => useContext(SchemaViewportRefContext);
