import { NumberRule } from '../types/rule';

export function isNumberRuleValid(rule: NumberRule, value: number): boolean {
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
