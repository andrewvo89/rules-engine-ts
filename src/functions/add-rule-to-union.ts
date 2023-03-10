import { NewRule, Rule } from '../types/rule';
import { RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { ruleSchema } from '../validations/rule';

/**
 * Add a rule to a union.
 * @export
 * @template T
 * @param {T} union
 * @param {NewRule} newRule
 * @return {*}  {{ union: T; rule: Rule }}
 */
export function addRuleToUnion<T extends RootUnion | Union>(union: T, newRule: NewRule): { union: T; rule: Rule } {
  const rule = ruleSchema.parse({ ...newRule, id: randomUUID(), parent_id: union.id, entity: 'rule' });
  union.rules.push(rule);
  return { union, rule };
}
