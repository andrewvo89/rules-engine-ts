import { NewNumberRule } from '../types/rule';
import { isNumberRuleValid } from './is-number-rule-valid';

test('number is equal to', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'equals_to',
    type: 'number',
    value: 2,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('number does not equal to', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'does_not_equal_to',
    type: 'number',
    value: 1,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('number is greater than', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'greater_than',
    type: 'number',
    value: 1,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('number is greater than or equal to', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'greater_than_or_equal_to',
    type: 'number',
    value: 2,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('number is less than', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'less_than',
    type: 'number',
    value: 3,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('number is less than or equal to', () => {
  const rule: NewNumberRule = {
    field: 'names',
    operator: 'less_than_or_equal_to',
    type: 'number',
    value: 2,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewNumberRule = {
    field: 'names',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'number',
    value: 2,
  };
  const result = isNumberRuleValid(rule, 2);
  expect(result).toBeFalsy();
});
