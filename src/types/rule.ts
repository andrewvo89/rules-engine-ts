import {
  baseArrayLengthRuleSchema,
  baseArrayValueRuleSchema,
  baseBooleanRuleSchema,
  baseGenericComparisonRuleSchema,
  baseGenericTypeRuleSchema,
  baseNumberRuleSchema,
  baseObjectKeyRuleSchema,
  baseObjectKeyValuePairRuleSchema,
  baseObjectValueRuleSchema,
  baseStringRuleSchema,
  newRuleSchema,
  ruleSchema,
} from '../validations/rule';

import { z } from 'zod';

export type Rule = z.infer<typeof ruleSchema>;

export type NewStringRule = z.infer<typeof baseStringRuleSchema>;

export type NewNumberRule = z.infer<typeof baseNumberRuleSchema>;

export type NewBooleanRule = z.infer<typeof baseBooleanRuleSchema>;

export type NewArrayValueRule = z.infer<typeof baseArrayValueRuleSchema>;

export type NewArrayLengthRule = z.infer<typeof baseArrayLengthRuleSchema>;

export type NewObjectKeyRule = z.infer<typeof baseObjectKeyRuleSchema>;

export type NewObjectValueRule = z.infer<typeof baseObjectValueRuleSchema>;

export type NewObjectKeyValueRule = z.infer<typeof baseObjectKeyValuePairRuleSchema>;

export type NewGenericComparisonRule = z.infer<typeof baseGenericComparisonRuleSchema>;

export type NewGenericTypeRule = z.infer<typeof baseGenericTypeRuleSchema>;

export type NewRule = z.infer<typeof newRuleSchema>;
