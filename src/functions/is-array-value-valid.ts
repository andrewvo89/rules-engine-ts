import { ArrayValueRule } from '../types/rule';

export function isArrayValueRuleValid(rule: ArrayValueRule, value: any[]): boolean {
  switch (rule.operator) {
    case 'contains':
      return value.includes(rule.value);
    case 'not_contains':
      return !value.includes(rule.value);
    case 'contains_all':
      return value.every((v) => v === rule.value);
    default:
      return false;
  }
}
