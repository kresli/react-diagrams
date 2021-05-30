import { useAtom } from "custom-react-context-state";
import { FunctionComponent, memo, useMemo } from "react";
// import { useData } from "../hooks";
import { DiagramLink } from "../components";
import { LinksAtom } from "./atoms";
export const LinksLayer: FunctionComponent = memo(() => {
  const [linksData] = useAtom(LinksAtom);
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
