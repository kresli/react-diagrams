import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramLink } from "../components";
import { LinksContext } from "../context";
export const LinksLayer: FunctionComponent = memo(() => {
  const linksData = useContext(LinksContext);
  const { zIndex } = useTheme();
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
        zIndex: zIndex.linksLayer,
      }}
    >
      {links}
    </svg>
  );
});
