import { Union } from '../types/union';
import { ruleSchema } from './rule';
import { z } from 'zod';

export const unionSchema: z.ZodType<Union> = z.object({
  entity: z.literal('union'),
  id: z.string(),
  parent_id: z.string(),
  connector: z.union([z.literal('and'), z.literal('or')]),
  rules: z.array(ruleSchema.or(z.lazy(() => unionSchema))),
});

export const rootUnionSchema = z.object({
  entity: z.literal('root_union'),
  id: z.string(),
  connector: z.union([z.literal('and'), z.literal('or')]),
  rules: z.array(ruleSchema.or(unionSchema)),
});

export const newUnionSchema = rootUnionSchema.pick({
  connector: true,
});
