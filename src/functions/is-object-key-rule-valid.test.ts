import { ObjectKeyRule } from '../types/rule';
import { isObjectKeyRuleValid } from './is-object-key-rule-valid';

const bob = { name: 'bob' };

test('object key contains element', () => {
  const rule: ObjectKeyRule = {
    field: 'people',
    operator: 'contains',
    type: 'object_key',
    value: 'name',
  };
  const result = isObjectKeyRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('object key does not contain element', () => {
  const rule: ObjectKeyRule = {
    field: 'people',
    operator: 'does_not_contain',
    type: 'object_key',
    value: 'age',
  };
  const result = isObjectKeyRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: ObjectKeyRule = {
    field: 'people',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'object_key',
    value: 'height',
  };
  const result = isObjectKeyRuleValid(rule, bob);
  expect(result).toBeFalsy();
});
