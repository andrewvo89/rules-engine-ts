import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';
import { ruleSchema } from '../validations/rule';
import { unionSchema } from '../validations/union';

export function normalize<T extends Union | RootUnion>(union: T): T {
  union.rules = union.rules.reduce<(Rule | Union)[]>((rules, ruleOrUnion) => {
    if (ruleOrUnion.entity === 'union') {
      const validated = unionSchema.safeParse(ruleOrUnion);

      if (!validated.success) {
        return rules;
      }
      const normalized = normalize(validated.data);
      if (normalized.rules.length === 0) {
        return rules;
      }
      rules.push({ ...normalized, parent_id: union.id });
      return rules;
    }
    const validated = ruleSchema.safeParse(ruleOrUnion);
    if (validated.success) {
      rules.push({ ...validated.data, parent_id: union.id });
    }
    return rules;
  }, []);
  return union;
}
