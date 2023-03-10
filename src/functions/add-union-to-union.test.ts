import { NewUnion } from '../types/union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';

test('union is added to a union', () => {
  const root = createRoot();
  const newUnion: NewUnion = {
    connector: 'and',
  };
  const { parent, union } = addUnionToUnion(root, newUnion);
  expect(parent).toBe(root);
  expect(parent.rules.length).toBe(1);
  expect(parent.rules[0]).toBe(union);
  expect(union.parent_id).toBe(root.id);
});
