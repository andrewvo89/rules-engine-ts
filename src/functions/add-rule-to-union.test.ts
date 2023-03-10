import { NewRule } from '../types/rule';
import { addRuleToUnion } from './add-rule-to-union';
import { createRoot } from './create-root';

test('rule is added to a union', () => {
  const root = createRoot();
  const newRule: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const { union, rule } = addRuleToUnion(root, newRule);
  expect(union).toBe(root);
  expect(union.rules.length).toBe(1);
  expect(union.rules[0]).toBe(rule);
  expect(rule.parent_id).toBe(root.id);
});
