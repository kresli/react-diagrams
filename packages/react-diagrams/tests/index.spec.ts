import * as api from "../src";
test("type", () => {
  expect(api.SchemaActionType).toBeDefined();
});
test("basic", () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Canvas": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "Diagram": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "DiagramContextMenuDefault": [Function],
      "DiagramLink": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "DiagramNode": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "DragLink": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "DragLinkDirection": Object {
        "BACKWARD": "BACKWARD",
        "FORWARD": "FORWARD",
      },
      "ElementType": Object {
        "CANVAS": "CANVAS",
        "GATE": "GATE",
        "LINK": "LINK",
        "NODE": "NODE",
        "PORT": "PORT",
        "VIEW": "VIEW",
      },
      "Gate": [Function],
      "Link": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "LinkRenderDefault": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": Object {
          "$$typeof": Symbol(react.forward_ref),
          "attrs": Array [],
          "componentStyle": e {
            "baseHash": -1457503223,
            "baseStyle": undefined,
            "componentId": "sc-gKAaRy",
            "isStatic": false,
            "rules": Array [
              "
      stroke-width: 4;
      stroke: rgb(98, 98, 98);
      stroke-linecap: round;
      fill: none;
      &:hover {
        stroke: rgb(255, 255, 255);
      }
    ",
            ],
            "staticRulesId": "",
          },
          "foldedComponentIds": Array [],
          "render": [Function],
          "shouldForwardProp": undefined,
          "styledComponentId": "sc-gKAaRy",
          "target": [Function],
          "toString": [Function],
          "warnTooManyClasses": [Function],
          "withComponent": [Function],
        },
      },
      "LinksLayer": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "NodeRenderDefault": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "NodesLayer": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "Port": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "PortType": Object {
        "INPUT": "INPUT",
        "OUTPUT": "OUTPUT",
      },
      "SchemaActionType": Object {
        "ADD_NODE": "ADD_NODE",
        "CREATE_DRAGGING_LINK": "CREATE_DRAGGING_LINK",
        "DELETE_DRAGGING_LINK": "DELETE_DRAGGING_LINK",
        "LINK_CREATE": "LINK_CREATE",
        "LINK_REMOVE": "LINK_REMOVE",
        "MOVE_DRAGGING_LINK": "MOVE_DRAGGING_LINK",
        "NODE_MOVE": "NODE_MOVE",
        "REGISTER_ELEMENT_TYPE": "REGISTER_ELEMENT_TYPE",
        "REMOVE_NODE": "REMOVE_NODE",
        "VIEWPORT_MOVE": "VIEWPORT_MOVE",
        "VIEWPORT_ZOOM": "VIEWPORT_ZOOM",
      },
      "SchemaProvider": [Function],
      "ViewLayer": Object {
        "$$typeof": Symbol(react.memo),
        "compare": null,
        "type": [Function],
      },
      "useAction": [Function],
      "useSchema": [Function],
    }
  `);
});
