import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramLink, DragLink } from ".";
import { DragLinkContext, LinksContext } from "../context";
import React from "react";
import { SchemaLink } from "../types";

interface Props {
  links: SchemaLink[];
}

export const LinksCanvas: FunctionComponent<Props> = memo(({ links }) => {
  // const dragLink = useContext(DragLinkContext);
  // const { zIndex } = useTheme();
  // const links = useMemo(
  //   () =>
  //     linksData.map((link) => {
  //       const { isArray } = Array;
  //       const { input, output } = link;
  //       const key = `${isArray(input) ? "_" : input}${
  //         isArray(output) ? "_" : output
  //       }`;
  //       return <DiagramLink key={key} link={link} />;
  //     }),
  //   [linksData]
  // );
  const renderLinks = useMemo(
    () =>
      links.map((link) => (
        <DiagramLink key={`${link.input}-${link.output}`} link={link} />
      )),
    [links]
  );
  return (
    <svg
      className="LinksLayer"
      style={{
        position: "absolute",
        pointerEvents: "none",
        width: 1,
        height: 1,
        overflow: "visible",
        // zIndex: zIndex.linksLayer,
      }}
    >
      {renderLinks}
      {/* {dragLink && <DragLink dragLink={dragLink} />} */}
    </svg>
  );
});
