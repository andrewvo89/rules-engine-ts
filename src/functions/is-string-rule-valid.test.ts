import { StringRule } from '../types/rule';
import { isStringRuleValid } from './is-string-rule-valid';

test('string equals to', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'equals_to',
    type: 'string',
    value: 'bob',
  };
  const result = isStringRuleValid(rule, 'bob');
  expect(result).toBeTruthy();
});

test('string equals to (case insensitve)', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'equals_to',
    type: 'string',
    value: 'BOB',
    ignore_case: true,
  };
  const result = isStringRuleValid(rule, 'BoB');
  expect(result).toBeTruthy();
});

test('string not equals to', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'does_not_equal_to',
    type: 'string',
    value: 'bob',
  };
  const result = isStringRuleValid(rule, 'alice');
  expect(result).toBeTruthy();
});

test('string contains', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const result = isStringRuleValid(rule, 'bobby');
  expect(result).toBeTruthy();
});

test('string does not contain', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'does_not_contain',
    type: 'string',
    value: 'alice',
  };
  const result = isStringRuleValid(rule, 'bobby');
  expect(result).toBeTruthy();
});

test('string starts with', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'starts_with',
    type: 'string',
    value: 'bob',
  };
  const result = isStringRuleValid(rule, 'bobby');
  expect(result).toBeTruthy();
});

test('string ends with', () => {
  const rule: StringRule = {
    field: 'people',
    operator: 'ends_with',
    type: 'string',
    value: 'bby',
  };
  const result = isStringRuleValid(rule, 'bobby');
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: StringRule = {
    field: 'people',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'string',
    value: 'carol',
  };
  const result = isStringRuleValid(rule, 'carolS');
  expect(result).toBeFalsy();
});
