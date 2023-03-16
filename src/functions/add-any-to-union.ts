import { NewRule, Rule } from '../types/rule';
import { NewUnion, RootUnion, Union } from '../types/union';

import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { newRuleSchema } from '../validations/rule';
import { newUnionSchema } from '../validations/union';

/**
 * Add a rule to a union.
 * This function will mutate the union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {(NewRule | NewUnion)} newRuleOrUnion
 * @return {*}  {(Rule | Union)}
 */
export function addAnyToUnion(parent: RootUnion | Union, newRuleOrUnion: NewRule | NewUnion): Rule | Union {
  const isNewRule = (ruleOrUnion: NewRule | NewUnion): ruleOrUnion is NewRule =>
    newRuleSchema.safeParse(ruleOrUnion).success;

  if (isNewRule(newRuleOrUnion)) {
    return addRuleToUnion(parent, newRuleOrUnion);
  }

  return addUnionToUnion(parent, newUnionSchema.parse(newRuleOrUnion));
}
