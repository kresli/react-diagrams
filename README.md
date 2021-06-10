# Simple Example

```tsx
import {useSchema, Diagram} from '@kresli/react-diagrams';

const Playground = () => {
  const schema = useSchema();
  return (
    <div style={{width: 400, height: 400}}>
      <Diagram schema={schema}>
    </div>
  );
}
```

# Custom Node

```tsx
import {useSchema, Diagram, createSchema} from '@kresli/react-diagrams';

const CustomNode: DiagramNodeRender = memo(({ inputs, outputs, data }) => {
  return (
    <div>
      <div>custom</div>
      <div>
        {inputs?.map((input) => (
          <div key={input.id}>
            Input
            <div id={input.key} />
          </div>
        ))}
        {outputs?.map((output) => (
          <div key={output.id}>
            Output
            <div id={output.key} />
          </div>
        ))}
      </div>
    </div>
  );
});

const initSchema = createSchema({
  nodes: [
    {
      id: "1",
      position: [100, 100] as [number, number],
      outputs: [{ id: "1" }],
      render: CustomNode,
    }
  ]
})

const Playground = () => {
  const schema = useSchema();
  return (
    <div style={{width: 400, height: 400}}>
      <Diagram schema={schema}>
    </div>
  );
}

```
