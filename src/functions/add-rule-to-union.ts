import { NewRule, Rule } from '../types/rule';
import { RootUnion, Union } from '../types/union';

import { ruleSchema } from '../validations/rule';
import { v4 as uuidv4 } from 'uuid';

/**
 * Add a rule to a union.
 * This function will mutate the parent union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {NewRule} newRule
 * @return {*}  {Rule}
 */
export function addRuleToUnion(parent: RootUnion | Union, newRule: NewRule): Rule {
  const rule = ruleSchema.parse({ ...newRule, id: uuidv4(), parent_id: parent.id, entity: 'rule' });
  parent.rules.push(rule);
  return rule;
}
