import { useContext } from "react";
import { SchemaActionContext } from "../components";

export const useAction = () => useContext(SchemaActionContext);
