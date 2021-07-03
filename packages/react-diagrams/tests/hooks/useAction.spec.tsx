import { SchemaActionContext, useAction } from "../../src";
import { renderHook } from "@testing-library/react-hooks";
import { FunctionComponent } from "react";

test("basic", () => {
  const action = () => {};
  const wrapper: FunctionComponent = ({ children }) => (
    <SchemaActionContext.Provider value={action}>
      {children}
    </SchemaActionContext.Provider>
  );
  const { result } = renderHook(() => useAction(), { wrapper });

  expect(result.current).toBe(action);
});
