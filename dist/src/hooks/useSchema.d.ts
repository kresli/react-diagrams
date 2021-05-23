/// <reference types="react" />
import { Schema } from "../types";
export declare const useSchema: (initSchema: Schema) => readonly [Schema, {
    onChange: import("react").Dispatch<import("../functions").SchemaAction>;
}];
