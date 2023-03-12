import { NewGenericComparisonRule } from '../types/rule';

/**
 * Check if a generic comparison rule is valid.
 * @export
 * @param {NewGenericComparisonRule} rule
 * @param {*} value
 * @return {*}  {boolean}
 */
export function isGenericComparisonRuleValid(rule: NewGenericComparisonRule, value: any): boolean {
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
