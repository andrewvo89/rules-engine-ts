import { NewBooleanRule } from '../types/rule';

/**
 * Check if a boolean rule is valid.
 * @export
 * @param {NewBooleanRule} rule
 * @param {boolean} value
 * @return {*}  {boolean}
 */
export function isBooleanRuleValid(rule: NewBooleanRule, value: boolean): boolean {
  switch (rule.operator) {
    case 'is_true':
      return value === true;
    case 'is_false':
      return value === false;
    default:
      return false;
  }
}
