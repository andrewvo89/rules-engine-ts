import { RootUnion } from '../types/union';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a new root union.
 * @export
 * @return {*}  {RootUnion}
 */
export function createRoot(connector: 'and' | 'or'): RootUnion {
  return { entity: 'root_union', id: uuidv4(), connector, rules: [] };
}
