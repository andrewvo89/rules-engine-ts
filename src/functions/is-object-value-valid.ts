import { ObjectValueRule } from '../types/rule';

export function isObjectValueValid(rule: ObjectValueRule, value: object): boolean {
  const values = Object.values(value);
  const contains = values.includes(rule.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'not_contains':
      return !contains;
    default:
      return false;
  }
}
