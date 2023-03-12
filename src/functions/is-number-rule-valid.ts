import { NewNumberRule } from '../types/rule';

/**
 * Check if a number rule is valid.
 * @export
 * @param {NewNumberRule} rule
 * @param {number} value
 * @return {*}  {boolean}
 */
export function isNumberRuleValid(rule: NewNumberRule, value: number): boolean {
  switch (rule.operator) {
    case 'equals_to':
      return value === rule.value;
    case 'does_not_equal_to':
      return value !== rule.value;
    case 'greater_than':
      return value > rule.value;
    case 'greater_than_or_equal_to':
      return value >= rule.value;
    case 'less_than':
      return value < rule.value;
    case 'less_than_or_equal_to':
      return value <= rule.value;
    default:
      return false;
  }
}
