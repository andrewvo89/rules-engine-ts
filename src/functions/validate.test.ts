import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { v4 as uuidv4 } from 'uuid';
import { validate } from './validate';

test('rules engine passes validation', () => {
  const root = createRoot({ connector: 'and' });
  addUnionToUnion(root, { connector: 'and' });
  addRuleToUnion(root, { field: 'number', operator: 'greater_than', type: 'number', value: 18 });

  const result = validate(root);
  expect(result.isValid).toBeTruthy();
});

test('rules engine validation fails validation with invalid union', () => {
  const root = createRoot({ connector: 'and' });

  // @ts-expect-error
  root.rules.push({ entity: 'union', id: uuidv4(), connector: 'neither', parent_id: root.id, rules: [] });

  const result = validate(root);
  expect(result.isValid).toBeFalsy();
  expect(!result.isValid && result.reason).toBeTruthy();
});

test('rules engine validation fails validation with invalid rule', () => {
  const root = createRoot({ connector: 'and' });

  root.rules.push({
    entity: 'rule',
    id: uuidv4(),
    field: 'number',
    operator: 'greater_than',
    // @ts-expect-error
    type: 'integer',
    value: 18,
    parent_id: root.id,
  });

  const result = validate(root);
  expect(result.isValid).toBeFalsy();
  expect(!result.isValid && result.reason).toBeTruthy();
});
