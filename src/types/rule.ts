import {
  arrayLengthRuleSchema,
  arrayValueRuleSchema,
  booleanRuleSchema,
  genericComparisonRuleSchema,
  genericTypeRuleSchema,
  newRuleSchema,
  numberRuleSchema,
  objectKeyRuleSchema,
  objectKeyValuePairRuleSchema,
  objectValueRuleSchema,
  ruleSchema,
  stringRuleSchema,
} from '../validations/rule';

import { z } from 'zod';

export type Rule = z.infer<typeof ruleSchema>;

export type StringRule = z.infer<typeof stringRuleSchema>;

export type NumberRule = z.infer<typeof numberRuleSchema>;

export type BooleanRule = z.infer<typeof booleanRuleSchema>;

export type ArrayValueRule = z.infer<typeof arrayValueRuleSchema>;

export type ArrayLengthRule = z.infer<typeof arrayLengthRuleSchema>;

export type ObjectKeyRule = z.infer<typeof objectKeyRuleSchema>;

export type ObjectValueRule = z.infer<typeof objectValueRuleSchema>;

export type ObjectKeyValueRule = z.infer<typeof objectKeyValuePairRuleSchema>;

export type GenericComparisonRule = z.infer<typeof genericComparisonRuleSchema>;

export type GenericTypeRule = z.infer<typeof genericTypeRuleSchema>;

export type NewRule = z.infer<typeof newRuleSchema>;
