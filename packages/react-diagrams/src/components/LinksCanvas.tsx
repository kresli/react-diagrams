import { FunctionComponent, memo, useMemo } from "react";
import { DiagramLink, DragLink } from ".";
import { Position, SchemaDragLink, SchemaLink } from "../types";
import { LINKS_CANVAS } from "../testIds";

interface Props {
  links: SchemaLink[];
  portNodePosition: Record<string, Position>;
  dragLink: SchemaDragLink | null;
}

export const LinksCanvas: FunctionComponent<Props> = memo(
  ({ links, portNodePosition, dragLink }) => {
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
        data-testid={LINKS_CANVAS}
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
        {dragLink && <DragLink dragLink={dragLink} />}
      </svg>
    );
  }
);
