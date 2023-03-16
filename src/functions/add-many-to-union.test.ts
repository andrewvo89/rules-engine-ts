import { NewRule } from '../types/rule';
import { NewUnion } from '../types/union';
import { addManyToUnion } from './add-many-to-union';
import { createRoot } from './create-root';

test('rule and a union is added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newUnion: NewUnion = {
    connector: 'and',
  };
  const newRule: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const rulesOrUnions = addManyToUnion(root, [newUnion, newRule]);
  expect(root.rules.length).toBe(2);
  rulesOrUnions.forEach((rule, index) => {
    expect(root.rules[index]).toBe(rule);
    expect(rule.parent_id).toBe(root.id);
  });
  expect(rulesOrUnions[0].entity === 'union');
  expect(rulesOrUnions[1].entity === 'rule');
});
