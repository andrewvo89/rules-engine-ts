import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';
import { ruleSchema } from '../validations/rule';
import { unionSchema } from '../validations/union';

type Options = {
  remove_failed_validations?: boolean;
  remove_empty_unions?: boolean;
  promote_single_rule_unions?: boolean;
  update_parent_ids?: boolean;
};

export function normalize<T extends Union | RootUnion>(union: T, options?: Options): T {
  const promote_single_rule_unions = options?.promote_single_rule_unions ?? true;
  const remove_empty_unions = options?.remove_empty_unions ?? true;
  const remove_failed_validations = options?.remove_failed_validations ?? true;
  const update_parent_ids = options?.update_parent_ids ?? true;

  union.rules = union.rules.reduce<(Rule | Union)[]>((rules, ruleOrUnion) => {
    if (ruleOrUnion.entity === 'union') {
      // Validate structure of a union
      if (remove_failed_validations) {
        const validated = unionSchema.safeParse(ruleOrUnion);
        if (!validated.success) {
          return rules;
        }
      }
      // Normalize the union
      const normalized = normalize(ruleOrUnion, options);
      // After normalization, if no rules are left, we can skip the union
      if (normalized.rules.length === 0 && remove_empty_unions) {
        return rules;
      }
      // If there is only one rule left, we can skip the union and add the rule directly
      if (normalized.rules.length === 1 && promote_single_rule_unions) {
        rules.push({ ...normalized.rules[0], parent_id: union.id });
        return rules;
      }
      // Append correct parent_id
      if (update_parent_ids) {
        rules.push({ ...normalized, parent_id: union.id });
        return rules;
      }
      rules.push(normalized);
      return rules;
    }
    // Validate structure of a rule
    if (remove_failed_validations) {
      const validated = ruleSchema.safeParse(ruleOrUnion);
      if (!validated.success) {
        return rules;
      }
    }
    // Append correct parent_id
    if (update_parent_ids) {
      rules.push({ ...ruleOrUnion, parent_id: union.id });
      return rules;
    }
    rules.push(ruleOrUnion);
    return rules;
  }, []);
  return union;
}
