import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { findRuleById } from './find-rule-by-id';
import { updateRuleById } from './update-rule-by-id';
import { v4 as uuidv4 } from 'uuid';

const root = createRoot({ connector: 'or' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });
const union = addUnionToUnion(root, { connector: 'and' });
addRuleToUnion(union, { field: 'age', operator: 'greater_than', type: 'number', value: 18 });
const rule = addRuleToUnion(union, { field: 'age', operator: 'less_than', type: 'number', value: 30 });

test('update a rule that exists', () => {
  const foundRule = findRuleById(root, rule.id);
  if (!foundRule) {
    throw new Error('Rule not found');
  }
  if (foundRule.type !== 'number') {
    throw new Error('Rule type is not number');
  }
  expect(foundRule.value).toBe(30);
  updateRuleById(root, foundRule.id, { field: 'age', operator: 'less_than', type: 'number', value: 40 });
  const updatedRule = findRuleById(root, rule.id);
  if (!updatedRule) {
    throw new Error('Rule not found');
  }
  if (updatedRule.type !== 'number') {
    throw new Error('Rule type is not number');
  }
  expect(updatedRule.value).toBe(40);
});

test('update a rule that does not exist', () => {
  const updatedRule = updateRuleById(root, uuidv4(), {
    field: 'age',
    operator: 'less_than',
    type: 'number',
    value: 40,
  });
  expect(updatedRule).toBeUndefined();
});

test('update a rule that does not have a valid parent', () => {
  const foundRule = findRuleById(root, rule.id);
  if (!foundRule) {
    throw new Error('Rule not found');
  }
  foundRule.parent_id = uuidv4();
  const updatedRule = updateRuleById(root, rule.id, {
    field: 'age',
    operator: 'less_than',
    type: 'number',
    value: 40,
  });
  expect(updatedRule).toBeUndefined();
});
