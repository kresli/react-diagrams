import { FunctionComponent, memo, useMemo } from "react";
import { SchemaNode, SchemaNodeRender } from "..";

type CustomNodeProps = SchemaNode & { render: SchemaNodeRender };

export const NodeContentCustom: FunctionComponent<{
  node: CustomNodeProps;
}> = memo(({ node }) => {
  const Render = node.render;
  const { id, inputs, outputs, data } = node;
  const props = useMemo(
    () => ({
      inputs: inputs?.map((input) => ({
        ...input,
        key: `GATE_${input.id}`,
      })),
      outputs: outputs?.map((output) => ({
        ...output,
        key: `GATE_${output.id}`,
      })),
      data: data,
    }),
    [data, inputs, outputs]
  );
  return <Render key={id} {...props} />;
});
