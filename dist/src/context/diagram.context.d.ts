import { Dispatch, FunctionComponent } from "react";
import { SchemaAction } from "../functions";
import { Schema } from "../types";
export declare const SchemaContext: import("react").Context<Schema>;
export declare const SchemaActionContext: import("react").Context<Dispatch<SchemaAction>>;
export declare const SchemaProvider: FunctionComponent<{
    schema: Schema;
    onChange: Dispatch<SchemaAction>;
}>;
