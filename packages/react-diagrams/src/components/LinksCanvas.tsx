import { FunctionComponent, memo, useContext, useMemo } from "react";
import { useTheme } from "styled-components";
import { DiagramLink, DragLink } from ".";
import { DragLinkContext, LinksContext } from "../context";
import React from "react";
import { Position, SchemaLink, SchemaNode } from "../types";

interface Props {
  links: SchemaLink[];
  portNodePosition: Record<string, Position>;
}

export const LinksCanvas: FunctionComponent<Props> = memo(
  ({ links, portNodePosition }) => {
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
        links.map((link) => {
          const key = `${link.input}-${link.output}`;
          const inputNodePosition = portNodePosition[link.input];
          const outputNodePosition = portNodePosition[link.output];
          if (!inputNodePosition || !outputNodePosition) return null;
          return (
            <DiagramLink
              key={key}
              link={link}
              inputNodePostion={inputNodePosition}
              outputNodePosition={outputNodePosition}
            />
          );
        }),
      [links, portNodePosition]
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
  }
);
