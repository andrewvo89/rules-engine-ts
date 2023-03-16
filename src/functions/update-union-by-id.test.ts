import { addRuleToUnion } from './add-rule-to-union';
import { addUnionToUnion } from './add-union-to-union';
import { createRoot } from './create-root';
import { findUnionById } from './find-union-by-id';
import { updateUnionById } from './update-union-by-id';
import { v4 as uuidv4 } from 'uuid';

const root = createRoot({ connector: 'or' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'bob' });
addRuleToUnion(root, { field: 'name', operator: 'contains', type: 'string', value: 'alice' });
const union = addUnionToUnion(root, { connector: 'and' });

test('update a union that exists', () => {
  const foundUnion = findUnionById(root, union.id);
  if (!foundUnion) {
    throw new Error('Union not found');
  }
  expect(foundUnion.connector).toBe('and');
  updateUnionById(root, foundUnion.id, { connector: 'or' });
  const updatedUnion = findUnionById(root, union.id);
  if (!updatedUnion) {
    throw new Error('Union not found');
  }
  expect(updatedUnion.connector).toBe('or');
});

test('update a root union', () => {
  const foundUnion = findUnionById(root, root.id);
  if (!foundUnion) {
    throw new Error('Union not found');
  }
  expect(foundUnion.connector).toBe('or');
  updateUnionById(root, foundUnion.id, { connector: 'and' });
  const updatedUnion = findUnionById(root, root.id);
  if (!updatedUnion) {
    throw new Error('Union not found');
  }
  expect(updatedUnion.connector).toBe('and');
});

test('update a union that does not exist', () => {
  const updatedUnion = updateUnionById(root, uuidv4(), { connector: 'or' });
  expect(updatedUnion).toBeUndefined();
});

test('update a union that does not have a valid parent', () => {
  const foundUnion = findUnionById(root, union.id);
  if (!foundUnion) {
    throw new Error('Union not found');
  }
  if (foundUnion.entity === 'root_union') {
    throw new Error('Union is not the correct type');
  }
  foundUnion.parent_id = uuidv4();
  const updatedUnion = updateUnionById(root, union.id, { connector: 'or' });
  expect(updatedUnion).toBeUndefined();
});
