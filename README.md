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
import {useSchema, Diagram, createSchema, Gate} from '@kresli/react-diagrams';

const CustomNode: DiagramNodeRender = memo(({ inputs, outputs, data }) => {
  return (
    <div>
      <div>My Custom Node</div>
      <div>
        {inputs?.map((input) => (
          <Gate key={input.id} port={input} />
        ))}
        {outputs?.map((output) => (
          <Gate key={output.id} port={output}/>
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

# Custom Link

``tsx

```

```
