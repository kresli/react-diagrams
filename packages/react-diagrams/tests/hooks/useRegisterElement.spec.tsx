import { renderHook } from "@testing-library/react-hooks";
import { FunctionComponent } from "react";
import { ElementType } from "../../src";
import { SchemaActionContext } from "../../src/context";
import { useRegisterElement } from "../../src/hooks";

test("basic", () => {
  const action = jest.fn();
  const wrapper: FunctionComponent = ({ children }) => (
    <SchemaActionContext.Provider value={action}>
      {children}
    </SchemaActionContext.Provider>
  );
  const ref = {
    current: document.createElement("div"),
  };
  renderHook(() => useRegisterElement(ref, ElementType.CANVAS, "my-id"), {
    wrapper,
  });
  expect(action).toHaveBeenCalledWith({
    element: ref.current,
    elementType: ElementType.CANVAS,
    id: "my-id",
    register: true,
    type: "REGISTER_ELEMENT_TYPE",
  });
});

test("skip registration if no element passed", () => {
  const action = jest.fn();
  const wrapper: FunctionComponent = ({ children }) => (
    <SchemaActionContext.Provider value={action}>
      {children}
    </SchemaActionContext.Provider>
  );
  const ref = {
    current: null,
  };
  renderHook(() => useRegisterElement(ref, ElementType.CANVAS, "my-id"), {
    wrapper,
  });
  expect(action).not.toHaveBeenCalled();
});
