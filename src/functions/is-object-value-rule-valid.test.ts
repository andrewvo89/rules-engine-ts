import { NewObjectValueRule } from '../types/rule';
import { isObjectValueRuleValid } from './is-object-value-rule-valid';

const bob = { name: 'bob' };

test('object value contains element', () => {
  const rule: NewObjectValueRule = {
    field: 'people',
    operator: 'contains',
    type: 'object_value',
    value: 'bob',
  };
  const result = isObjectValueRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('object value does not contain element', () => {
  const rule: NewObjectValueRule = {
    field: 'people',
    operator: 'does_not_contain',
    type: 'object_value',
    value: 'alice',
  };
  const result = isObjectValueRuleValid(rule, bob);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewObjectValueRule = {
    field: 'people',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'object_value',
    value: 'carol',
  };
  const result = isObjectValueRuleValid(rule, bob);
  expect(result).toBeFalsy();
});
