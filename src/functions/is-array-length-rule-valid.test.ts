import { NewArrayLengthRule } from '../types/rule';
import { isArrayLengthRuleValid } from './is-array-length-rule-valid';

const names = ['bob', 'alice'];

test('array length is equal to', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'equals_to',
    type: 'array_length',
    value: 2,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('array length does not equal to', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'does_not_equal_to',
    type: 'array_length',
    value: 1,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('array length is greater than', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'greater_than',
    type: 'array_length',
    value: 1,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('array length is greater than or equal to', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'greater_than_or_equal_to',
    type: 'array_length',
    value: 2,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('array length is less than', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'less_than',
    type: 'array_length',
    value: 3,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('array length is less than or equal to', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    operator: 'less_than_or_equal_to',
    type: 'array_length',
    value: 2,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewArrayLengthRule = {
    field: 'names',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'array_length',
    value: 2,
  };
  const result = isArrayLengthRuleValid(rule, names);
  expect(result).toBeFalsy();
});
