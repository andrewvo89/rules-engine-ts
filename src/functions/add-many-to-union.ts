import { NewRule, Rule } from '../types/rule';
import { NewUnion, RootUnion, Union } from '../types/union';

import { addAnyToUnion } from './add-any-to-union';

/**
 * Add many rules or unions to a union.
 * This function will mutate the parent union.
 * @export
 * @param {(RootUnion | Union)} parent
 * @param {((NewRule | NewUnion)[])} newRulesOrUnions
 * @return {*}  {((Rule | Union)[])}
 */
export function addManyToUnion(parent: RootUnion | Union, newRulesOrUnions: (NewRule | NewUnion)[]): (Rule | Union)[] {
  return newRulesOrUnions.map((newRuleOrUnion) => addAnyToUnion(parent, newRuleOrUnion));
}
