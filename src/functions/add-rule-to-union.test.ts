import { NewRule } from '../types/rule';
import { addRuleToUnion } from './add-rule-to-union';
import { createRoot } from './create-root';

test('rule is added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newRule: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const rule = addRuleToUnion(root, newRule);
  expect(root.rules.length).toBe(1);
  expect(root.rules[0]).toBe(rule);
  expect(rule.parent_id).toBe(root.id);
});
