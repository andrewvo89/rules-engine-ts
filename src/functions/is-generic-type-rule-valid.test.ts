import { NewGenericTypeRule } from '../types/rule';
import { isGenericTypeRuleValid } from './is-generic-type-rule-valid';

test('value is truth', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_truthy',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, 'bob');
  expect(result).toBeTruthy();
});

test('value is falsey', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_falsey',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, undefined);
  expect(result).toBeTruthy();
});

test('value is null', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_null',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, null);
  expect(result).toBeTruthy();
});

test('value is not null', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_null',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, {});
  expect(result).toBeTruthy();
});

test('value is undefined', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_undefined',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, undefined);
  expect(result).toBeTruthy();
});

test('value is not undefined', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_undefined',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, false);
  expect(result).toBeTruthy();
});

test('value is string', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_string',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, 'alice');
  expect(result).toBeTruthy();
});

test('value is not string', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_string',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, 12345);
  expect(result).toBeTruthy();
});

test('value is number', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_number',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, 123.4);
  expect(result).toBeTruthy();
});

test('value is not number', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_number',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, '12345');
  expect(result).toBeTruthy();
});

test('value is boolean', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_boolean',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, false);
  expect(result).toBeTruthy();
});

test('value is not boolean', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_boolean',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, 'false');
  expect(result).toBeTruthy();
});

test('value is array', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_array',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, []);
  expect(result).toBeTruthy();
});

test('value is not array', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_array',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, '[]');
  expect(result).toBeTruthy();
});

test('value is object', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_object',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, { name: 'bob' });
  expect(result).toBeTruthy();
});

test('value is not array', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    operator: 'is_not_object',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, '{}');
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewGenericTypeRule = {
    field: 'name',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'generic_type',
  };
  const result = isGenericTypeRuleValid(rule, undefined);
  expect(result).toBeFalsy();
});
