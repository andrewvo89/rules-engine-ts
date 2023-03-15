import { newUnionSchema, rootUnionSchema } from '../validations/union';

import { Rule } from './rule';
import { z } from 'zod';

export type Union = {
  entity: 'union';
  id: string;
  parent_id: string;
  connector: 'and' | 'or';
  rules: (Rule | Union)[];
};

export type RootUnion = z.infer<typeof rootUnionSchema>;

export type NewUnion = z.infer<typeof newUnionSchema>;
