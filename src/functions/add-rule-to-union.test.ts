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
  const { parent, rule } = addRuleToUnion(root, newRule);
  expect(parent).toBe(root);
  expect(parent.rules.length).toBe(1);
  expect(parent.rules[0]).toBe(rule);
  expect(rule.parent_id).toBe(root.id);
});
