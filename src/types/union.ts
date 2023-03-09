import { Rule } from './rule';
import { rootUnionSchema } from '../validations/union';
import { z } from 'zod';

export type Union = {
  entity: 'union';
  id: string;
  parent_id: string;
  connector: 'and' | 'or';
  rules: (Rule | Union)[];
};

export type RootUnion = z.infer<typeof rootUnionSchema>;

export type NewUnionParams = Omit<Union, 'id' | 'parent_id' | 'entity' | 'rules'>;
