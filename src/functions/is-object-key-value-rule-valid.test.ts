import { NewObjectKeyValueRule } from '../types/rule';
import { isObjectKeyValueRuleValid } from './is-object-key-value-rule-valid';

const bob = { name: 'bob', age: 30 };

test('object key & value contains element', () => {
  const rule: NewObjectKeyValueRule = {
    field: 'people',
    operator: 'contains',
    type: 'object_key_value',
    value: { key: 'name', value: 'bob' },
  };
  const result = isObjectKeyValueRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('object key & value does not contain element', () => {
  const rule: NewObjectKeyValueRule = {
    field: 'people',
    operator: 'does_not_contain',
    type: 'object_key_value',
    value: { key: 'name', value: 'alice' },
  };
  const result = isObjectKeyValueRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewObjectKeyValueRule = {
    field: 'people',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'object_key_value',
    value: { key: 'name', value: 'carol' },
  };
  const result = isObjectKeyValueRuleValid(rule, bob);
  expect(result).toBeFalsy();
});
