import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { randomUUID } from 'crypto';
import { validate } from './validate';

test('rules engine passes validation', () => {
  const root = createRoot();
  addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });

  const result = validate(root);
  expect(result.isValid).toBeTruthy();
});

test('rules engine fails validation with invalid union', () => {
  const root = createRoot();

  // @ts-expect-error
  root.rules.push({ entity: 'union', id: randomUUID(), connector: 'neither', parent_id: root.id, rules: [] });

  const result = validate(root);
  expect(result.isValid).toBeFalsy();
  expect(!result.isValid && result.reason).toBe('Code: invalid_union ~ Path: rules[0] ~ Message: Invalid input');
});
