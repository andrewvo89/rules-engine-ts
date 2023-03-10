import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';

/**
 * Removes all rules or unions from a union and nested unions by id.
 * Mutates the original union.
 * @export
 * @template T
 * @param {T} union
 * @param {string} id
 * @return {*}  {T}
 */
export function removeAllById<T extends RootUnion | Union>(union: T, id: string): T {
  union.rules = union.rules.reduce<(Rule | Union)[]>((list, ruleOrUnion) => {
    if (ruleOrUnion.id !== id) {
      list.push(ruleOrUnion.entity === 'union' ? removeAllById(ruleOrUnion, id) : ruleOrUnion);
    }
    return list;
  }, []);
  return union;
}
