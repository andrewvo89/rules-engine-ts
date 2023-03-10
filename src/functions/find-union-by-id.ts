import { RootUnion, Union } from '../types/union';

/**
 * Find a union by id.
 * @export
 * @param {(RootUnion | Union)} union
 * @param {string} id
 * @return {*}  {(RootUnion | Union | undefined)}
 */
export function findUnionById(union: RootUnion | Union, id: string): RootUnion | Union | undefined {
  if (union.id === id) {
    return union;
  }
  return union.rules.reduce<Union | RootUnion | undefined>((foundUnion, ruleOrUnion) => {
    if (foundUnion || ruleOrUnion.entity === 'rule') {
      return foundUnion;
    }
    if (ruleOrUnion.id === id) {
      return ruleOrUnion;
    }
    return findUnionById(ruleOrUnion, id);
  }, undefined);
}
