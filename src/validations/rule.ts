import { z } from 'zod';

export const baseRuleSchema = z.object({
  entity: z.literal('rule'),
  id: z.string(),
  parent_id: z.string(),
});

export const baseStringRuleSchema = z.object({
  type: z.literal('string'),
  field: z.string(),
  operator: z.union([
    z.literal('equals_to'),
    z.literal('does_not_equal_to'),
    z.literal('contains'),
    z.literal('does_not_contain'),
    z.literal('starts_with'),
    z.literal('ends_with'),
  ]),
  value: z.string(),
  ignore_case: z.boolean().optional(),
});

export const stringRuleSchema = baseRuleSchema.merge(baseStringRuleSchema);

export const baseNumberRuleSchema = z.object({
  type: z.literal('number'),
  field: z.string(),
  operator: z.union([
    z.literal('equals_to'),
    z.literal('does_not_equal_to'),
    z.literal('greater_than'),
    z.literal('greater_than_or_equal_to'),
    z.literal('less_than'),
    z.literal('less_than_or_equal_to'),
  ]),
  value: z.number(),
});

export const numberRuleSchema = baseRuleSchema.merge(baseNumberRuleSchema);

export const baseBooleanRuleSchema = z.object({
  type: z.literal('boolean'),
  field: z.string(),
  operator: z.union([z.literal('is_true'), z.literal('is_false')]),
});

export const booleanRuleSchema = baseRuleSchema.merge(baseBooleanRuleSchema);

export const baseArrayValueRuleSchema = z.object({
  type: z.literal('array_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('does_not_contain'), z.literal('contains_all')]),
  value: z.any(),
});

export const arrayValueRuleSchema = baseRuleSchema.merge(baseArrayValueRuleSchema);

export const baseArrayLengthRuleSchema = z.object({
  type: z.literal('array_length'),
  field: z.string(),
  operator: z.union([
    z.literal('equals_to'),
    z.literal('does_not_equal_to'),
    z.literal('greater_than'),
    z.literal('greater_than_or_equal_to'),
    z.literal('less_than'),
    z.literal('less_than_or_equal_to'),
  ]),
  value: z.number(),
});

export const arrayLengthRuleSchema = baseRuleSchema.merge(baseArrayLengthRuleSchema);

export const baseObjectKeyRuleSchema = z.object({
  type: z.literal('object_key'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('does_not_contain')]),
  value: z.string(),
});

export const objectKeyRuleSchema = baseRuleSchema.merge(baseObjectKeyRuleSchema);

export const baseObjectValueRuleSchema = z.object({
  type: z.literal('object_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('does_not_contain')]),
  value: z.any(),
});

export const objectValueRuleSchema = baseRuleSchema.merge(baseObjectValueRuleSchema);

export const baseObjectKeyValuePairRuleSchema = z.object({
  type: z.literal('object_key_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('does_not_contain')]),
  value: z.object({
    key: z.string(),
    value: z.any(),
  }),
});

export const objectKeyValueRuleSchema = baseRuleSchema.merge(baseObjectKeyValuePairRuleSchema);

export const baseGenericComparisonRuleSchema = z.object({
  type: z.literal('generic_comparison'),
  field: z.string(),
  operator: z.union([
    z.literal('equals_to'),
    z.literal('does_not_equal_to'),
    z.literal('greater_than'),
    z.literal('greater_than_or_equal_to'),
    z.literal('less_than'),
    z.literal('less_than_or_equal_to'),
  ]),
  value: z.any(),
});

export const genericComparisonRuleSchema = baseRuleSchema.merge(baseGenericComparisonRuleSchema);

export const baseGenericTypeRuleSchema = z.object({
  type: z.literal('generic_type'),
  field: z.string(),
  operator: z.union([
    z.literal('is_truthy'),
    z.literal('is_falsey'),
    z.literal('is_null'),
    z.literal('is_not_null'),
    z.literal('is_undefined'),
    z.literal('is_not_undefined'),
    z.literal('is_string'),
    z.literal('is_not_string'),
    z.literal('is_number'),
    z.literal('is_not_number'),
    z.literal('is_boolean'),
    z.literal('is_not_boolean'),
    z.literal('is_array'),
    z.literal('is_not_array'),
    z.literal('is_object'),
    z.literal('is_not_object'),
  ]),
});

export const genericTypeRuleSchema = baseRuleSchema.merge(baseGenericTypeRuleSchema);

export const ruleSchema = z.discriminatedUnion('type', [
  stringRuleSchema,
  numberRuleSchema,
  booleanRuleSchema,
  arrayValueRuleSchema,
  arrayLengthRuleSchema,
  objectKeyRuleSchema,
  objectValueRuleSchema,
  objectKeyValueRuleSchema,
  genericComparisonRuleSchema,
  genericTypeRuleSchema,
]);

export const newRuleSchema = z.union([
  baseStringRuleSchema,
  baseNumberRuleSchema,
  baseBooleanRuleSchema,
  baseArrayValueRuleSchema,
  baseArrayLengthRuleSchema,
  baseObjectKeyRuleSchema,
  baseObjectValueRuleSchema,
  baseObjectKeyValuePairRuleSchema,
  baseGenericComparisonRuleSchema,
  baseGenericTypeRuleSchema,
]);
