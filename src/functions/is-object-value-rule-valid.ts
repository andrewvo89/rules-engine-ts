import { ObjectValueRule } from '../types/rule';

/**
 * Check if an object value rule is valid.
 * @export
 * @param {ObjectValueRule} rule
 * @param {object} value
 * @return {*}  {boolean}
 */
export function isObjectValueRuleValid(rule: ObjectValueRule, value: object): boolean {
  const values = Object.values(value);
  const contains = values.includes(rule.value);
  switch (rule.operator) {
    case 'contains':
      return contains;
    case 'does_not_contain':
      return !contains;
    default:
      return false;
  }
}
