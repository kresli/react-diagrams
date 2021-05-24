import { FunctionComponent, memo } from "react";

export const ContextPopup: FunctionComponent<{
  onAddNode: () => void;
}> = memo(({ onAddNode }) => {
  return (
    <div>
      <button onClick={onAddNode}>create</button>
    </div>
  );
});
