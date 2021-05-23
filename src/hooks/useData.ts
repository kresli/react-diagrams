import { useContext } from 'react';
import { SchemaContext } from '../context';

export const useData = () => useContext(SchemaContext);
