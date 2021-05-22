import { useContext } from 'react';
import { SchemaContext } from 'src/context';

export const useSchema = () => useContext(SchemaContext);
