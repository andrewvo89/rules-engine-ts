import { ObjectKeyValueRule } from '../types/rule';

export function isObjectKeyValueRuleValid(rule: ObjectKeyValueRule, value: object): boolean {
  const entries = Object.entries(value);
  const contains = entries.some(([key, value]) => key === rule.value.key && value === rule.value.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'does_not_contain':
      return !contains;
    default:
      return false;
  }
}
