import { FunctionComponent, memo, useMemo } from "react";
import { useData } from "../hooks";
import { SchemaNode, SchemaNodeRender } from "../types";
import { DiagramNode, DiagramNodeHolder } from "./DiagramNode";

type CustomNodeProps = SchemaNode & { render: SchemaNodeRender };

const CustomNode: FunctionComponent<{
  node: CustomNodeProps;
}> = ({ node }) => {
  const Render = node.render;
  const { id, inputs, outputs, data } = node;
  const props = {
    inputs: inputs?.map((input) => ({
      ...input,
      key: `GATE_${input.id}`,
    })),
    outputs: outputs?.map((output) => ({
      ...output,
      key: `GATE_${output.id}`,
    })),
    data: data,
  };
  return <Render key={id} {...props} />;
};

export const NodesLayer: FunctionComponent = memo(() => {
  const schema = useData();
  const nodes = useMemo(
    () =>
      schema.nodes.map((node) => {
        const { id } = node;
        const content = node.render ? (
          <CustomNode node={node as CustomNodeProps} />
        ) : (
          <DiagramNode node={node} />
        );
        return (
          <DiagramNodeHolder key={id} node={node}>
            {content}
          </DiagramNodeHolder>
        );
      }),
    [schema.nodes]
  );
  return (
    <div className="nodesLayer" style={{ position: "absolute" }}>
      {nodes}
    </div>
  );
});
