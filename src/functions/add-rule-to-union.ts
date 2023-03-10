import { NewRule, Rule } from '../types/rule';
import { RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { ruleSchema } from '../validations/rule';

/**
 * Add a rule to a union.
 * @export
 * @template T
 * @param {T} parent
 * @param {NewRule} newRule
 * @return {*}  {{ parent: T; rule: Rule }}
 */
export function addRuleToUnion<T extends RootUnion | Union>(parent: T, newRule: NewRule): { parent: T; rule: Rule } {
  const rule = ruleSchema.parse({ ...newRule, id: randomUUID(), parent_id: parent.id, entity: 'rule' });
  parent.rules.push(rule);
  return { parent, rule };
}
