import { NewRule, Rule } from '../types/rule';
import { NewUnion, RootUnion, Union } from '../types/union';

import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { newRuleSchema } from '../validations/rule';
import { newUnionSchema } from '../validations/union';

/**
 * Adds a rule or a union to a union.
 * This function will mutate the parent union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {(NewRule | NewUnion)} newRuleOrUnion
 * @return {*}  {(Rule | Union)}
 */
export function addAnyToUnion(parent: RootUnion | Union, newRuleOrUnion: NewRule | NewUnion): Rule | Union {
  const validatedRule = newRuleSchema.safeParse(newRuleOrUnion);
  if (validatedRule.success) {
    return addRuleToUnion(parent, validatedRule.data);
  }
  return addUnionToUnion(parent, newUnionSchema.parse(newRuleOrUnion));
}
