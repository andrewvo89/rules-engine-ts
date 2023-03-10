import { RootUnion } from '../types/union';
import { generateErrorMessage } from 'zod-error';
import { getOrphaned } from './get-orphaned';
import { rootUnionSchema } from '../validations/union';

/**
 * Validates a root union before running it.
 * @export
 * @param {RootUnion} root
 * @return {*}  {({ isValid: true } | { isValid: false; reason: string })}
 */
export function validate(root: RootUnion): { isValid: true } | { isValid: false; reason: string } {
  const validated = rootUnionSchema.safeParse(root);

  // Schema check
  if (!validated.success) {
    return { isValid: false, reason: generateErrorMessage(validated.error.issues) };
  }

  // Orphan check
  const orphaned = getOrphaned(root);
  if (orphaned.length > 0) {
    const orphanedMessage = orphaned.map((o) => `${o.ruleOrUnion.id} nested under parent ${o.parent.id}`).join(', ');
    return { isValid: false, reason: `The following rules or unions are orphaned: ${orphanedMessage}` };
  }

  return { isValid: true };
}
