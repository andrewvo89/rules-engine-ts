import { NewRule, Rule } from '../types/rule';
import { RootUnion, Union } from '../types/union';

import { randomUUID } from 'crypto';
import { ruleSchema } from '../validations/rule';

/**
 * Add a rule to a union.
 * This function will mutate the union.
 * @export
 * @param {(RootUnion | Union)} union
 * @param {NewRule} newRule
 * @return {*}  {Rule}
 */
export function addRuleToUnion(union: RootUnion | Union, newRule: NewRule): Rule {
  const rule = ruleSchema.parse({ ...newRule, id: randomUUID(), parent_id: union.id, entity: 'rule' });
  union.rules.push(rule);
  return rule;
}
