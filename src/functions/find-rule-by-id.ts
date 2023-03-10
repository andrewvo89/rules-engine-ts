import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';

/**
 * Find a rule by id.
 * @export
 * @param {(RootUnion | Union)} union
 * @param {string} id
 * @return {*}  {(Rule | undefined)}
 */
export function findRuleById(union: RootUnion | Union, id: string): Rule | undefined {
  return union.rules.reduce<Rule | undefined>((foundRule, ruleOrUnion) => {
    if (foundRule) {
      return foundRule;
    }
    if (ruleOrUnion.entity === 'rule') {
      return ruleOrUnion.id === id ? ruleOrUnion : undefined;
    }
    return findRuleById(ruleOrUnion, id);
  }, undefined);
}
