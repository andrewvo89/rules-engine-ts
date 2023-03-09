import { ObjectKeyValueRule } from '../types/rule';

export function isObjectKeyValueValid(rule: ObjectKeyValueRule, value: object): boolean {
  const entries = Object.entries(value);
  const contains = entries.some(([key, value]) => key === rule.value.key && value === rule.value.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'not_contains':
      return !contains;
    default:
      return false;
  }
}
