import { ObjectKeyRule } from '../types/rule';

export function isObjectKeyRuleValid(rule: ObjectKeyRule, value: object): boolean {
  const keys = Object.keys(value);
  const contains = keys.includes(rule.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'does_not_contain':
      return !contains;
    default:
      return false;
  }
}
