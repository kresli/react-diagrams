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
