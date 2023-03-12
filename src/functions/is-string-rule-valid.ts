import { NewStringRule } from '../types/rule';

/**
 * Check if a string rule is valid.
 * @export
 * @param {NewStringRule} rule
 * @param {string} value
 * @return {*}  {boolean}
 */
export function isStringRuleValid(rule: NewStringRule, value: string): boolean {
  const caseValue = rule.ignore_case ? value.toLowerCase().trim() : value.trim();
  const caseRuleValue = rule.ignore_case ? rule.value.toLowerCase().trim() : rule.value.trim();
  switch (rule.operator) {
    case 'equals_to':
      return caseValue === caseRuleValue;
    case 'does_not_equal_to':
      return caseValue !== caseRuleValue;
    case 'contains':
      return caseValue.includes(caseRuleValue);
    case 'does_not_contain':
      return !caseValue.includes(caseRuleValue);
    case 'starts_with':
      return caseValue.startsWith(caseRuleValue);
    case 'ends_with':
      return caseValue.endsWith(caseRuleValue);
    default:
      return false;
  }
}
