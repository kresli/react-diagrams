import { FunctionComponent, memo } from "react";
import { ElementType } from "../src/types";

const Canvas: FunctionComponent<{
  onAddNode: () => void;
}> = ({ onAddNode }) => {
  return (
    <div>
      <button onClick={onAddNode}>create</button>
    </div>
  );
};

const Element: FunctionComponent = () => {
  return <div>node</div>;
};
const Link: FunctionComponent = () => {
  return <div>link</div>;
};
const Port: FunctionComponent = () => {
  return <div>port</div>;
};

export const ContextPopup: FunctionComponent<{
  onAddNode: () => void;
  contextTypes: ElementType[] | null;
}> = memo(({ onAddNode, contextTypes }) => {
  if (!contextTypes) return null;
  switch (true) {
    case contextTypes[0] === ElementType.CANVAS:
      return <Canvas onAddNode={onAddNode} />;
    case contextTypes[0] === ElementType.NODE:
      return <Element />;
    case contextTypes.includes(ElementType.PORT):
      return <Port />;
    case contextTypes[0] === ElementType.LINK:
      return <Link />;
  }
  return null;
});
