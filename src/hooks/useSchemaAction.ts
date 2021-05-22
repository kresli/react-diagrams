import { useContext } from 'react';
import { SchemaActionContext } from 'src/context';

export const useSchemaAction = () => useContext(SchemaActionContext);
