import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { randomUUID } from 'crypto';
import { removeAllById } from './remove-all-by-id';

test('remove many unions (deeply nested)', () => {
  const root = createRoot('and');
  const { union } = addUnionToUnion(root, { connector: 'and' });
  const { union: deepUnion } = addUnionToUnion(union, { connector: 'and' });
  deepUnion.id = union.id;
  root.rules.push(union);
  root.rules.push(union);
  root.rules.push(union);

  expect(root.rules).toContain(union);
  expect(root.rules.length).toBe(4);
  expect(union.rules).toContain(deepUnion);
  expect(union.rules.length).toBe(1);

  removeAllById(root, union.id);

  expect(root.rules).not.toContain(union);
  expect(root.rules.length).toBe(0);
  expect(union.rules).not.toContain(deepUnion);
  expect(union.rules.length).toBe(0);
});

test('remove non existent id', () => {
  const root = createRoot('and');
  const { union } = addUnionToUnion(root, { connector: 'and' });

  expect(root.rules).toContain(union);
  expect(root.rules.length).toBe(1);

  removeAllById(root, randomUUID());

  expect(root.rules).toContain(union);
  expect(root.rules.length).toBe(1);
});
