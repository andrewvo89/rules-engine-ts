import { RootUnion, Union } from '../types/union';
import { rootUnionSchema, unionSchema } from '../validations/union';

import { Rule } from '../types/rule';
import get from 'lodash.get';
import { isArrayLengthRuleValid } from './is-array-length-valid';
import { isArrayValueRuleValid } from './is-array-value-valid';
import { isBooleanRuleValid } from './is-boolean-rule-valid';
import { isGenericComparisonRuleValid } from './is-generic-comparison-rule-valid';
import { isGenericTypeRuleValid } from './is-generic-type-rule-valid';
import { isNumberRuleValid } from './is-number-rule-valid';
import { isObjectKeyValid } from './is-object-key-valid';
import { isObjectKeyValueValid } from './is-object-key-value-valid';
import { isObjectValueValid } from './is-object-value-valid';
import isPlainObject from 'lodash.isplainobject';
import { isStringRuleValid } from './is-string-rule-valid';

const isObject = (value: any): value is object => isPlainObject(value);

export function run(union: RootUnion | Union, value: any): boolean {
  const validated = rootUnionSchema.or(unionSchema).parse(union);
  console.log(' validated', validated);
  if (validated.rules.length === 0) {
    return true;
  }

  const callback = (ruleOrUnion: Rule | Union) => {
    if (ruleOrUnion.entity === 'union') {
      return run(ruleOrUnion, value);
    }
    const resolved = get(value, ruleOrUnion.field);

    if (ruleOrUnion.type === 'string' && typeof resolved === 'string') {
      return isStringRuleValid(ruleOrUnion, resolved);
    }

    if (ruleOrUnion.type === 'number' && typeof resolved === 'number') {
      return isNumberRuleValid(ruleOrUnion, resolved);
    }

    if (ruleOrUnion.type === 'boolean' && typeof resolved === 'boolean') {
      return isBooleanRuleValid(ruleOrUnion, resolved);
    }

    if (Array.isArray(resolved)) {
      if (ruleOrUnion.type === 'array_value') {
        return isArrayValueRuleValid(ruleOrUnion, resolved);
      }

      if (ruleOrUnion.type === 'array_length') {
        return isArrayLengthRuleValid(ruleOrUnion, resolved);
      }
    }

    if (isObject(resolved)) {
      if (ruleOrUnion.type === 'object_key') {
        return isObjectKeyValid(ruleOrUnion, resolved);
      }

      if (ruleOrUnion.type === 'object_value') {
        return isObjectValueValid(ruleOrUnion, resolved);
      }

      if (ruleOrUnion.type === 'object_key_value') {
        return isObjectKeyValueValid(ruleOrUnion, resolved);
      }
    }

    if (ruleOrUnion.type === 'generic_comparison') {
      return isGenericComparisonRuleValid(ruleOrUnion, resolved);
    }

    if (ruleOrUnion.type === 'generic_type') {
      return isGenericTypeRuleValid(ruleOrUnion, resolved);
    }

    return false;
  };

  // If the joiner is an AND, then all rules must be true
  if (validated.connector === 'and') {
    return union.rules.every(callback);
  }

  // If the joiner is an OR, then at least one rule must be true
  return validated.rules.some(callback);
}
