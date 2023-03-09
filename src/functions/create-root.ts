import { RootUnion } from '../types/union';
import { randomUUID } from 'crypto';

export function createRoot(): RootUnion {
  return { entity: 'root_union', id: randomUUID(), connector: 'and', rules: [] };
}
