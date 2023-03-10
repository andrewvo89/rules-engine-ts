import { ArrayValueRule } from '../types/rule';
import { isArrayValueRuleValid } from './is-array-value-rule-valid';

const bob = { name: 'bob' };
const alice = { name: 'alice' };
const carol = { name: 'carol' };
const people = [bob, alice];
const all_bob = [bob, bob, bob, bob];

test('array contains element', () => {
  const rule: ArrayValueRule = {
    field: 'people',
    operator: 'contains',
    type: 'array_value',
    value: bob,
  };
  const result = isArrayValueRuleValid(rule, people);
  expect(result).toBeTruthy();
});

test('array does not contain element', () => {
  const rule: ArrayValueRule = {
    field: 'people',
    operator: 'does_not_contain',
    type: 'array_value',
    value: carol,
  };
  const result = isArrayValueRuleValid(rule, people);
  expect(result).toBeTruthy();
});

test('array contains all of an element', () => {
  const rule: ArrayValueRule = {
    field: 'people',
    operator: 'contains_all',
    type: 'array_value',
    value: bob,
  };
  const result = isArrayValueRuleValid(rule, all_bob);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: ArrayValueRule = {
    field: 'people',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'array_value',
    value: bob,
  };
  const result = isArrayValueRuleValid(rule, people);
  expect(result).toBeFalsy();
});
