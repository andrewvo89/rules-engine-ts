import { NewRule } from '../types/rule';
import { NewUnion } from '../types/union';
import { addAnyToUnion } from './add-any-to-union';
import { createRoot } from './create-root';

test('union is added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newUnion: NewUnion = {
    connector: 'and',
  };
  const union = addAnyToUnion(root, newUnion);
  expect(root.rules.length).toBe(1);
  expect(root.rules[0]).toBe(union);
  expect(union.parent_id).toBe(root.id);
});

test('rule is added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newRule: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const rule = addAnyToUnion(root, newRule);
  expect(root.rules.length).toBe(1);
  expect(root.rules[0]).toBe(rule);
  expect(rule.parent_id).toBe(root.id);
});
