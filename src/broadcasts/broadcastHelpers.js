import { fail, MISSING_TRIGGER, INVALID_TRIGGER } from '../utils/alert';

export const validateBroadcastDeclaration = ({ declaration }) => {
  if (!declaration.on) {
    fail(
      'Broadcast channel declarations should have at least one trigger',
      MISSING_TRIGGER
    );
  }
  if (typeof declaration.on !== 'string' && !Array.isArray(declaration.on)) {
    fail(
      'Broadcast channel declarations `on` trigger should either be a string or a string array',
      INVALID_TRIGGER
    );
  }
};
