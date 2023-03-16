import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { run } from './run';

const root = createRoot({ connector: 'and' });

const union = addUnionToUnion(root, { connector: 'and' });
const firstRule = addRuleToUnion(union, {
  field: 'number',
  operator: 'greater_than',
  type: 'number',
  value: 18,
});
addRuleToUnion(union, { field: 'number', operator: 'less_than', type: 'number', value: 30 });
addRuleToUnion(root, { field: 'string', operator: 'contains', type: 'string', value: 'bob' });
addRuleToUnion(root, { field: 'boolean', operator: 'is_true', type: 'boolean' });
addRuleToUnion(root, { field: 'array', operator: 'contains', type: 'array_value', value: 'alice' });
addRuleToUnion(root, { field: 'array', operator: 'equals_to', type: 'array_length', value: 1 });
addRuleToUnion(root, { field: 'object', operator: 'contains', type: 'object_key', value: 'name' });
addRuleToUnion(root, { field: 'object', operator: 'contains', type: 'object_value', value: 'bob' });
addRuleToUnion(root, {
  field: 'object',
  operator: 'contains',
  type: 'object_key_value',
  value: { key: 'name', value: 'bob' },
});
addRuleToUnion(root, { field: 'generic', operator: 'equals_to', type: 'generic_comparison', value: 'bob' });
addRuleToUnion(root, { field: 'generic', operator: 'is_truthy', type: 'generic_type' });
const orUnion = addUnionToUnion(root, { connector: 'or' });
addRuleToUnion(orUnion, { field: 'number', operator: 'less_than', type: 'number', value: 30 });
addRuleToUnion(orUnion, { field: 'string', operator: 'contains', type: 'string', value: 'bob' });

test('rules engine passes', () => {
  const result = run(root, {
    string: 'bob',
    boolean: true,
    number: 20,
    array: ['alice'],
    object: { name: 'bob' },
    generic: 'bob',
  });
  expect(result).toBeTruthy();
});

test('rules engine fails', () => {
  root.connector = 'and';
  const result = run(root, {
    string: 'bob',
    boolean: true,
    number: 20,
    array: ['alice'],
    object: { name: 'bob' },
    generic: 'bobby',
  });
  expect(result).toBeFalsy();
});

test('test invalid rule', () => {
  const invalidRule = { ...firstRule };
  // @ts-expect-error
  delete invalidRule.id;

  root.rules.splice(0, 1, invalidRule);
  expect(() => run(root, {})).toThrowError();
  root.rules.splice(0, 1, firstRule);
});

test('test no rules available', () => {
  const noRuleRoot = createRoot({ connector: 'and' });
  const result = run(noRuleRoot, {});
  expect(result).toBeTruthy();
});
