import { NewUnion, RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { unionSchema } from '../validations/union';

/**
 * Add a new union to a union.
 * @export
 * @template T
 * @param {T} parent
 * @param {NewUnion} newUnion
 * @return {*}  {{ parent: T; union: Union }}
 */
export function addUnionToUnion<T extends RootUnion | Union>(
  parent: T,
  newUnion: NewUnion,
): { parent: T; union: Union } {
  const union = unionSchema.parse({ ...newUnion, id: randomUUID(), parent_id: parent.id, entity: 'union', rules: [] });
  parent.rules.push(union);
  return { parent, union };
}
