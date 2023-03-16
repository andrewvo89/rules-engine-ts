import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { findUnionById } from './find-union-by-id';
import { v4 as uuidv4 } from 'uuid';

const root = createRoot({ connector: 'or' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });
const union = addUnionToUnion(root, { connector: 'and' });
addRuleToUnion(union, { field: 'age', operator: 'greater_than', type: 'number', value: 18 });
const rule = addRuleToUnion(union, { field: 'age', operator: 'less_than', type: 'number', value: 30 });
const union2 = addUnionToUnion(union, { connector: 'and' });

test('find root union', () => {
  const result = findUnionById(root, root.id);
  expect(result).toBe(root);
});

test('find deeply nested rule', () => {
  const result = findUnionById(root, rule.id);
  expect(result).toBeUndefined();
});

test('find deeply nested union', () => {
  const result = findUnionById(root, union2.id);
  expect(result).toBe(union2);
});

test('find non existent rule', () => {
  const result = findUnionById(root, uuidv4());
  expect(result).toBeUndefined();
});
