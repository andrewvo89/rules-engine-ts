import { RootUnion, Union } from '../types/union';

/**
 * Find a union by id.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {string} id
 * @return {*}  {(RootUnion | Union | undefined)}
 */
export function findUnionById(parent: RootUnion | Union, id: string): RootUnion | Union | undefined {
  if (parent.id === id) {
    return parent;
  }
  return parent.rules.reduce<Union | RootUnion | undefined>((foundUnion, ruleOrUnion) => {
    if (foundUnion || ruleOrUnion.entity === 'rule') {
      return foundUnion;
    }
    if (ruleOrUnion.id === id) {
      return ruleOrUnion;
    }
    return findUnionById(ruleOrUnion, id);
  }, undefined);
}
