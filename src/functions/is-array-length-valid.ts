import { ArrayLengthRule } from '../types/rule';

export function isArrayLengthRuleValid(rule: ArrayLengthRule, value: any[]): boolean {
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
