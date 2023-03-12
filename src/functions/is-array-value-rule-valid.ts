import { NewArrayValueRule } from '../types/rule';

/**
 * Check if an array value rule is valid.
 * @export
 * @param {NewArrayValueRule} rule
 * @param {any[]} value
 * @return {*}  {boolean}
 */
export function isArrayValueRuleValid(rule: NewArrayValueRule, value: any[]): boolean {
  switch (rule.operator) {
    case 'contains':
      return value.includes(rule.value);
    case 'does_not_contain':
      return !value.includes(rule.value);
    case 'contains_all':
      return value.every((v) => v === rule.value);
    default:
      return false;
  }
}
