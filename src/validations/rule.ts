import { z } from 'zod';

export const ruleBaseSchema = z.object({
  id: z.string(),
  parent_id: z.string(),
  entity: z.literal('rule'),
});

export const stringRuleSchema = z.object({
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
  ignore_case: z.boolean().optional(),
  value: z.string().min(1),
});

export const numberRuleSchema = z.object({
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

export const booleanRuleSchema = z.object({
  type: z.literal('boolean'),
  field: z.string(),
  operator: z.union([z.literal('is_true'), z.literal('is_false')]),
});

export const arrayValueRuleSchema = z.object({
  type: z.literal('array_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('not_contains'), z.literal('contains_all')]),
  value: z.any(),
});

export const arrayLengthRuleSchema = z.object({
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
// export const arrayRuleSchema = z.discriminatedUnion('operator', [arrayValueRuleSchema, arrayLengthRuleSchema]);

export const objectKeyRuleSchema = z.object({
  type: z.literal('object_key'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('not_contains')]),
  value: z.string(),
});

export const objectValueRuleSchema = z.object({
  type: z.literal('object_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('not_contains')]),
  value: z.any(),
});

export const objectKeyValuePairRuleSchema = z.object({
  type: z.literal('object_key_value'),
  field: z.string(),
  operator: z.union([z.literal('contains'), z.literal('not_contains')]),
  value: z.object({
    key: z.string(),
    value: z.any(),
  }),
});

// export const objectRuleSchema = z.discriminatedUnion('operator', [
//   objectContainsKeyRuleSchema,
//   objectContainsValueRuleSchema,
//   objectContainsKeyValuePairRuleSchema,
// ]);

export const genericComparisonRuleSchema = z.object({
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

export const genericTypeRuleSchema = z.object({
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

// export const genericRuleSchema = z.discriminatedUnion('operator', [
//   objectContainsKeyRuleSchema,
//   objectContainsValueRuleSchema,
//   objectContainsKeyValuePairRuleSchema,
// ]);

export const ruleSchema = z.discriminatedUnion('type', [
  ruleBaseSchema.merge(stringRuleSchema),
  ruleBaseSchema.merge(numberRuleSchema),
  ruleBaseSchema.merge(booleanRuleSchema),
  ruleBaseSchema.merge(arrayValueRuleSchema),
  ruleBaseSchema.merge(arrayLengthRuleSchema),
  ruleBaseSchema.merge(objectKeyRuleSchema),
  ruleBaseSchema.merge(objectValueRuleSchema),
  ruleBaseSchema.merge(objectKeyValuePairRuleSchema),
  ruleBaseSchema.merge(genericComparisonRuleSchema),
  ruleBaseSchema.merge(genericTypeRuleSchema),
]);

export const newRuleSchema = z.union([
  stringRuleSchema,
  numberRuleSchema,
  booleanRuleSchema,
  arrayValueRuleSchema,
  arrayLengthRuleSchema,
  objectKeyRuleSchema,
  objectValueRuleSchema,
  objectKeyValuePairRuleSchema,
  genericComparisonRuleSchema,
  genericTypeRuleSchema,
]);
