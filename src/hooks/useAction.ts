import { useContext } from 'react';
import { SchemaActionContext } from '../context';

export const useAction = () => useContext(SchemaActionContext);
