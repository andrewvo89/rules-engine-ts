import { createRoot } from './create-root';
import { z } from 'zod';

test('root union is created', () => {
  const root = createRoot({ connector: 'and' });
  expect(root.entity).toBe('root_union');
  expect(root.rules.length).toBe(0);
  expect(z.string().uuid().safeParse(root.id).success).toBeTruthy();
  expect(root.connector).toBe('and');
});
