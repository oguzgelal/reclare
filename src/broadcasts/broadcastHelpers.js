import { fail } from '../utils/alert';

export const validateBroadcastDeclaration = ({ declaration }) => {
  if (!declaration.on) {
    fail('Broadcast channel declarations should have at least one trigger', 'f2+fpC38gEa8+V');
  }
  if (typeof declaration.on !== 'string' && !Array.isArray(declaration.on)) {
    fail(
      'Broadcast channel declarations `on` trigger should either be a string or a string array',
      'Ai/LlDsZ/nYFFk'
    );
  }
};
