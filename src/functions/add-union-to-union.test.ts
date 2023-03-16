import { NewUnion } from '../types/union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';

test('union is added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newUnion: NewUnion = {
    connector: 'and',
  };
  const union = addUnionToUnion(root, newUnion);
  expect(root.rules.length).toBe(1);
  expect(root.rules[0]).toBe(union);
  expect(union.parent_id).toBe(root.id);
});
