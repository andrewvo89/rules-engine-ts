import { ObjectKeyRule } from '../types/rule';

export function isObjectKeyValid(rule: ObjectKeyRule, value: object): boolean {
  const keys = Object.keys(value);
  const contains = keys.includes(rule.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'not_contains':
      return !contains;
    default:
      return false;
  }
}
