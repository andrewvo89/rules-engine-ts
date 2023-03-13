import { NewUnion, RootUnion, Union } from '../types/union';

import { unionSchema } from '../validations/union';
import { v4 as uuidv4 } from 'uuid';

/**
 * Add a new union to a union.
 * This function will mutate the parent union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {NewUnion} newUnion
 * @return {*}  {Union}
 */
export function addUnionToUnion(parent: RootUnion | Union, newUnion: NewUnion): Union {
  const union = unionSchema.parse({ ...newUnion, id: uuidv4(), parent_id: parent.id, entity: 'union', rules: [] });
  parent.rules.push(union);
  return union;
}
