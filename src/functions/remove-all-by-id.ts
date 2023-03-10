import { RootUnion, Union } from '../types/union';

/**
 * Removes all rules or unions from a union and nested unions by id.
 * @export
 * @template T
 * @param {T} union
 * @param {string} id
 * @return {*}  {T}
 */
export function removeAllById<T extends RootUnion | Union>(union: T, id: string): T {
  const newRules: T['rules'] = [];
  for (const ruleOrUnion of union.rules) {
    if (ruleOrUnion.entity === 'union') {
      removeAllById(ruleOrUnion, id);
    }
    if (ruleOrUnion.id !== id) {
      newRules.push(ruleOrUnion);
    }
  }
  union.rules = newRules;
  return union;
}
