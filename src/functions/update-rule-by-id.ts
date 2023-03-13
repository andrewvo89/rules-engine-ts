import { NewRule, Rule } from '../types/rule';

import { RootUnion } from '../types/union';
import { findRuleById } from './find-rule-by-id';
import { findUnionById } from './find-union-by-id';

/**
 * Update a rule by id.
 * If the rule is not found, return undefined.
 * Mutates the root object.
 * @export
 * @param {RootUnion} root
 * @param {string} id
 * @param {NewRule} values
 * @return {*}  {(Rule | undefined)}
 */
export function updateRuleById(root: RootUnion, id: string, values: NewRule): Rule | undefined {
  const foundRule = findRuleById(root, id);
  if (!foundRule) {
    return;
  }

  // Get parent union to update rules array
  const parent = findUnionById(root, foundRule.parent_id);
  if (!parent) {
    return;
  }

  // Update parent rules array
  parent.rules = parent.rules.map((ruleOrUnion) => {
    if (ruleOrUnion.entity === 'rule' && ruleOrUnion.id === foundRule.id) {
      return { ...ruleOrUnion, ...values };
    }
    return ruleOrUnion;
  });

  return findRuleById(root, id);
}
