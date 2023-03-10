import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { getOrphaned } from './get-orphaned';
import { randomUUID } from 'crypto';

test('there are no orphaned rules', () => {
  const root = createRoot();
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  const { union } = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  const result = getOrphaned(root);
  expect(result.length).toBe(0);
});

test('there are orhpaned rules', () => {
  const root = createRoot();
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  const { union } = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  const { rule } = addRuleToUnion(union, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });
  rule.parent_id = randomUUID();
  const result = getOrphaned(root);
  expect(result.length).toBe(1);
  expect(result[0].ruleOrUnion).toBe(rule);
  expect(result[0].parent).toBe(union);
});
