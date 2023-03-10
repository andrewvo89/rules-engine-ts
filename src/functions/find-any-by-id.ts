import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';

/**
 * Find a rule or a union by id.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {string} id
 * @return {*}  {(RootUnion | Union | Rule | undefined)}
 */
export function findAnyById(parent: RootUnion | Union, id: string): RootUnion | Union | Rule | undefined {
  if (parent.id === id) {
    return parent;
  }
  return parent.rules.reduce<Union | RootUnion | Rule | undefined>((foundUnion, ruleOrUnion) => {
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