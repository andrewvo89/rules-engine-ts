import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { normalize } from './normalize';
import { v4 as uuidv4 } from 'uuid';

test('normalization removes an invalid rule', () => {
  const root = createRoot({ connector: 'or' });

  const rule = addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  rule.type = 'number';

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization fixes the parent id of a rule', () => {
  const root = createRoot({ connector: 'or' });

  const rule = addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  rule.parent_id = uuidv4();

  root.rules.forEach((rule) => {
    expect(rule.parent_id).not.toBe(root.id);
  });
  expect(root.rules[0].parent_id).not.toBe(root.id);
  normalize(root);
  root.rules.forEach((rule) => {
    expect(rule.parent_id).toBe(root.id);
  });
});

test('normalization removes an invalid union', () => {
  const root = createRoot({ connector: 'or' });

  const union = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  // @ts-expect-error
  union.connector = 'invalid';

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization removes an union with no rules', () => {
  const root = createRoot({ connector: 'or' });
  addUnionToUnion(root, { connector: 'and' });

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization promotes union with 1 rule to parent level', () => {
  const root = createRoot({ connector: 'or' });
  addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });

  const union = addUnionToUnion(root, { connector: 'and' });
  const rule = addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });

  expect(root.rules[1].entity).toBe('union');
  expect(root.rules[1].id).toBe(union.id);

  normalize(root);

  expect(root.rules[1].entity).toBe('rule');
  expect(root.rules[1].id).toBe(rule.id);
});

test('normalization finds nothing wrong', () => {
  const root = createRoot({ connector: 'or' });
  addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });

  const union = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });
  addRuleToUnion(union, { field: 'age', operator: 'greater_than', type: 'number', value: 18 });

  expect(root.rules).toHaveLength(2);
  root.rules.forEach((rule) => {
    expect(rule.parent_id).toBe(root.id);
  });

  normalize(root);

  expect(root.rules).toHaveLength(2);
  root.rules.forEach((rule) => {
    expect(rule.parent_id).toBe(root.id);
  });
});

test('normalization has all options turn off', () => {
  const root = createRoot({ connector: 'or' });
  addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });

  const union = addUnionToUnion(root, { connector: 'and' });
  const rule = addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });
  addRuleToUnion(union, { field: 'age', operator: 'greater_than', type: 'number', value: 18 });

  expect(union.parent_id).toBe(root.id);
  expect(rule.parent_id).toBe(union.id);

  union.parent_id = uuidv4();
  rule.parent_id = uuidv4();

  normalize(root, {
    update_parent_ids: false,
    promote_single_rule_unions: false,
    remove_empty_unions: false,
    remove_failed_validations: false,
  });

  expect(union.parent_id).not.toBe(root.id);
  expect(rule.parent_id).not.toBe(union.id);
});
