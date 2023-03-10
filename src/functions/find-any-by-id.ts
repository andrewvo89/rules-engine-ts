import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';

/**
 * Find a rule or a union by id.
 * @export
 * @param {(RootUnion | Union)} union
 * @param {string} id
 * @return {*}  {(RootUnion | Union | Rule | undefined)}
 */
export function findAnyById(union: RootUnion | Union, id: string): RootUnion | Union | Rule | undefined {
  if (union.id === id) {
    return union;
  }
  return union.rules.reduce<Union | RootUnion | Rule | undefined>((foundUnion, ruleOrUnion) => {
    if (foundUnion) {
      return foundUnion;
    }
    if (ruleOrUnion.id === id) {
      return ruleOrUnion;
    }
    if (ruleOrUnion.entity === 'union') {
      return findAnyById(ruleOrUnion, id);
    }
    return foundUnion;
  }, undefined);
}
