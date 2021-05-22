import { Dispatch, FunctionComponent, memo } from 'react';
import { SchemaProvider, ViewportProvider } from 'src/context';
import { Canvas } from 'src/components';
import { Schema } from 'src/types';
import { SchemaAction } from 'src/functions';
import React from 'react';

export const Diagram: FunctionComponent<{
  schema: Schema;
  onChange: Dispatch<SchemaAction>;
}> = memo(({ schema, onChange }) => {
  return (
    <ViewportProvider>
      <SchemaProvider schema={schema} onChange={onChange}>
        <Canvas />
      </SchemaProvider>
    </ViewportProvider>
  );
});
