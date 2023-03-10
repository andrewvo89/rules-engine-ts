import { RootUnion, Union } from '../types/union';

import { Rule } from '../types/rule';

type Return = { ruleOrUnion: Rule | Union; parent: RootUnion | Union }[];

/**
 * Returns an array of orphaned rules and unions.
 * @export
 * @param {(RootUnion | Union)} union
 * @return {*}  {Return}
 */
export function getOrphaned(union: RootUnion | Union): Return {
  return union.rules.reduce<Return>((prev, ruleOrUnion) => {
    if (ruleOrUnion.parent_id !== union.id) {
      prev.push({ ruleOrUnion, parent: union });
    }
    if (ruleOrUnion.entity === 'union') {
      prev.push(...getOrphaned(ruleOrUnion));
    }
    return prev;
  }, []);
}
