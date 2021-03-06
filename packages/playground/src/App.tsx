import "./App.css";
import { Diagram, Schema, useSchema } from "@kresli/react-diagrams";

const initialSchema: Schema = {
  dragLink: null,
  registeredElements: new Map(),
  portNodePosition: {},
  canvasRef: null,
  viewRef: null,
  nodes: [
    {
      id: "node_a",
      label: "Node A",
      position: [100, 100],
      outputs: [{ id: "1", label: "Out" }],
    },
    {
      id: "node_b",
      label: "Node B",
      position: [400, 400],
      inputs: [{ id: "3", label: "In" }],
    },
  ],
  links: [
    {
      input: "3",
      output: "1",
    },
  ],
  position: [0, 0],
  scale: 1,
};

function App() {
  const schema = useSchema(initialSchema);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Diagram schema={schema} />
    </div>
  );
}

export default App;
