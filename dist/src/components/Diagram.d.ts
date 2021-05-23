import { Dispatch, MutableRefObject } from "react";
import { Schema } from "../types";
import { SchemaAction } from "../functions";
interface Props {
    schema: Schema;
    onChange: Dispatch<SchemaAction>;
    ref?: MutableRefObject<HTMLDivElement | null>;
}
export declare const Diagram: import("react").NamedExoticComponent<Props>;
export {};
