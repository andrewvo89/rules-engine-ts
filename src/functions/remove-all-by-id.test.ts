import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { removeAllById } from './remove-all-by-id';
import { v4 as uuidv4 } from 'uuid';

test('remove many deeply nested union', () => {
  const root = createRoot({ connector: 'and' });
  const union = addUnionToUnion(root, { connector: 'and' });
  const deepUnion = addUnionToUnion(union, { connector: 'and' });
  addRuleToUnion(deepUnion, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
  const deeperUnion = addUnionToUnion(deepUnion, { connector: 'and' });

  deepUnion.rules.push(deeperUnion);
  deepUnion.rules.push(deeperUnion);
  deepUnion.rules.push(deeperUnion);

  expect(deepUnion.rules).toContain(deeperUnion);
  expect(deepUnion.rules.length).toBe(5);

  removeAllById(root, deeperUnion.id);

  expect(deepUnion.rules).not.toContain(deepUnion);
  expect(deepUnion.rules.length).toBe(1);
});

test('remove non existent id', () => {
  const root = createRoot({ connector: 'and' });
  const union = addUnionToUnion(root, { connector: 'and' });

  expect(root.rules).toContain(union);
  expect(root.rules.length).toBe(1);

  removeAllById(root, uuidv4());

  expect(root.rules).toContain(union);
  expect(root.rules.length).toBe(1);
});
