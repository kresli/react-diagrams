import { FunctionComponent, memo, useMemo } from "react";
import { useSchema } from "src/hooks";
import { DiagramLink } from "src/components";
export const LinksLayer: FunctionComponent = memo(() => {
  const schema = useSchema();
  const links = useMemo(
    () =>
      schema.links.map((link) => (
        <DiagramLink key={`${link.input}${link.output}`} {...link} />
      )),
    [schema.links]
  );
  return (
    <svg
      className="LinksLayer"
      style={{
        position: "absolute",
        pointerEvents: "none",
        width: 1,
        height: 1,
        overflow: "overlay",
      }}
    >
      {links}
    </svg>
  );
});
