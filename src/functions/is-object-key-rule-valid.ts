import { ObjectKeyRule } from '../types/rule';

/**
 * Check if an object key rule is valid.
 * @export
 * @param {ObjectKeyRule} rule
 * @param {object} value
 * @return {*}  {boolean}
 */
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
