import { GenericComparisonRule } from '../types/rule';
import { isGenericComparisonRuleValid } from './is-generic-comparison-rule-valid';

test('value is equal to', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'equals_to',
    type: 'generic_comparison',
    value: 2,
  };
  const result = isGenericComparisonRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('value does not equal to', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'does_not_equal_to',
    type: 'generic_comparison',
    value: 1,
  };
  const result = isGenericComparisonRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('value is greater than', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'greater_than',
    type: 'generic_comparison',
    value: 'alice',
  };
  const result = isGenericComparisonRuleValid(rule, 'bob');
  expect(result).toBeTruthy();
});

test('value is greater than or equal to', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'greater_than_or_equal_to',
    type: 'generic_comparison',
    value: 'alice',
  };
  const result = isGenericComparisonRuleValid(rule, 'bob');
  expect(result).toBeTruthy();
});

test('value is less than', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'less_than',
    type: 'generic_comparison',
    value: 'bob',
  };
  const result = isGenericComparisonRuleValid(rule, 'alice');
  expect(result).toBeTruthy();
});

test('value is less than or equal to', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    operator: 'less_than_or_equal_to',
    type: 'generic_comparison',
    value: 'bob',
  };
  const result = isGenericComparisonRuleValid(rule, 'alice');
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: GenericComparisonRule = {
    field: 'names',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'generic_comparison',
    value: 1,
  };
  const result = isGenericComparisonRuleValid(rule, 1);
  expect(result).toBeFalsy();
});
