import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { normalize } from './normalize';
import { randomUUID } from 'crypto';

test('normalization removes an invalid rule', () => {
  const root = createRoot('or');

  const rule = addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  rule.type = 'number';

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization fixes the parent id of a rule', () => {
  const root = createRoot('or');

  const rule = addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  rule.parent_id = randomUUID();

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
  const root = createRoot('or');

  const union = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  // @ts-expect-error
  union.connector = 'invalid';

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization removes an union with no rules', () => {
  const root = createRoot('or');
  addUnionToUnion(root, { connector: 'and' });

  expect(root.rules).toHaveLength(1);
  normalize(root);
  expect(root.rules).toHaveLength(0);
});

test('normalization finds nothing wrong', () => {
  const root = createRoot('or');

  const union = addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(union, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });

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
