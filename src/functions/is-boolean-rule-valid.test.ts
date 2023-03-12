import { NewBooleanRule } from '../types/rule';
import { isBooleanRuleValid } from './is-boolean-rule-valid';

const isValid = true;
const isInvalid = false;

test('boolean is true', () => {
  const rule: NewBooleanRule = {
    field: 'status',
    operator: 'is_true',
    type: 'boolean',
  };
  const result = isBooleanRuleValid(rule, isValid);
  expect(result).toBeTruthy();
});

test('boolean is false', () => {
  const rule: NewBooleanRule = {
    field: 'status',
    operator: 'is_false',
    type: 'boolean',
  };
  const result = isBooleanRuleValid(rule, isInvalid);
  expect(result).toBeTruthy();
});

test('invalid operator is handled', () => {
  const rule: NewBooleanRule = {
    field: 'status',
    // @ts-expect-error
    operator: 'is_more_awesome_than',
    type: 'boolean',
  };
  const result = isBooleanRuleValid(rule, isValid);
  expect(result).toBeFalsy();
});
