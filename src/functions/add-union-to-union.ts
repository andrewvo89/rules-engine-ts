import { NewUnion, RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { unionSchema } from '../validations/union';

/**
 * Add a new union to a union.
 * This function will mutate the parent union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {NewUnion} newUnion
 * @return {*}  {Union}
 */
export function addUnionToUnion(parent: RootUnion | Union, newUnion: NewUnion): Union {
  const union = unionSchema.parse({ ...newUnion, id: randomUUID(), parent_id: parent.id, entity: 'union', rules: [] });
  parent.rules.push(union);
  return union;
}
