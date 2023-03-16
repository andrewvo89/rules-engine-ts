import { NewUnion, RootUnion } from '../types/union';

import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a new root union.
 * @export
 * @param {NewUnion} newUnion
 * @return {*}  {RootUnion}
 */
export function createRoot(newUnion: NewUnion): RootUnion {
  return { ...newUnion, entity: 'root_union', id: uuidv4(), rules: [] };
}
