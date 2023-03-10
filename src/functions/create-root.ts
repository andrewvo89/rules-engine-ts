import { RootUnion } from '../types/union';
import { randomUUID } from 'crypto';

/**
 * Creates a new root union.
 * @export
 * @return {*}  {RootUnion}
 */
export function createRoot(): RootUnion {
  return { entity: 'root_union', id: randomUUID(), connector: 'and', rules: [] };
}
