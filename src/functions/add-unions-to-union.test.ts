import { NewUnion } from '../types/union';
import { addUnionsToUnion } from './add-unions-to-union';
import { createRoot } from './create-root';

test('unions are added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newUnionA: NewUnion = {
    connector: 'and',
  };
  const newUnionB: NewUnion = {
    connector: 'or',
  };
  expect(root.rules.length).toBe(0);
  const rules = addUnionsToUnion(root, [newUnionA, newUnionB]);
  expect(root.rules.length).toBe(2);
  rules.forEach((rule, index) => {
    expect(root.rules[index]).toBe(rule);
    expect(rule.parent_id).toBe(root.id);
  });
});
