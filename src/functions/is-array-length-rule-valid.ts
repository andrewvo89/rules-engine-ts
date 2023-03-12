import { NewArrayLengthRule } from '../types/rule';

/**
 * Check if an array length rule is valid.
 * @export
 * @param {NewArrayLengthRule} rule
 * @param {any[]} value
 * @return {*}  {boolean}
 */
export function isArrayLengthRuleValid(rule: NewArrayLengthRule, value: any[]): boolean {
  switch (rule.operator) {
    case 'equals_to':
      return value.length === rule.value;
    case 'does_not_equal_to':
      return value.length !== rule.value;
    case 'greater_than':
      return value.length > rule.value;
    case 'greater_than_or_equal_to':
      return value.length >= rule.value;
    case 'less_than':
      return value.length < rule.value;
    case 'less_than_or_equal_to':
      return value.length <= rule.value;
    default:
      return false;
  }
}
