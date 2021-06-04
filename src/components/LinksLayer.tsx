import { memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramLink, DragLink } from "../components";
import { DragLinkContext, LinksContext } from "../context";

export const LinksLayer = memo(() => {
  const linksData = useContext(LinksContext);
  const dragLink = useContext(DragLinkContext);
  const { zIndex } = useTheme();
  const links = useMemo(
    () =>
      linksData.map((link) => {
        const { isArray } = Array;
        const { input, output } = link;
        const key = `${isArray(input) ? "_" : input}${
          isArray(output) ? "_" : output
        }`;
        return <DiagramLink key={key} link={link} />;
      }),
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
      {dragLink && <DragLink />}
    </svg>
  );
});
