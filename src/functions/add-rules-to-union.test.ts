import { NewRule } from '../types/rule';
import { addRulesToUnion } from './add-rules-to-union';
import { createRoot } from './create-root';

test('rules are added to a union', () => {
  const root = createRoot({ connector: 'and' });
  const newRuleA: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'bob',
  };
  const newRuleB: NewRule = {
    field: 'name',
    operator: 'contains',
    type: 'string',
    value: 'alice',
  };
  expect(root.rules.length).toBe(0);
  const rules = addRulesToUnion(root, [newRuleA, newRuleB]);
  expect(root.rules.length).toBe(2);
  rules.forEach((rule, index) => {
    expect(root.rules[index]).toBe(rule);
    expect(rule.parent_id).toBe(root.id);
  });
});
