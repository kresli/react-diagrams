import { FunctionComponent, memo, useContext, useMemo } from "react";
import { DiagramLink } from "../components";
import { LinksContext } from "../context";
export const LinksLayer: FunctionComponent = memo(() => {
  const linksData = useContext(LinksContext);
  const links = useMemo(
    () =>
      linksData.map((link) => (
        <DiagramLink key={`${link.input}${link.output}`} {...link} />
      )),
    [linksData]
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
