import { NewUnionParams, RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { unionSchema } from '../validations/union';

export function addUnionToUnion<T extends RootUnion | Union>(
  parent: T,
  newUnion: NewUnionParams,
): { parent: T; union: Union } {
  const union = unionSchema.parse({ ...newUnion, id: randomUUID(), parent_id: parent.id, entity: 'union', rules: [] });
  parent.rules.push(union);
  return { parent, union };
}
