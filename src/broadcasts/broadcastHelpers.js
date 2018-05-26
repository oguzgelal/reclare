import { fail, MISSING_TRIGGER } from '../utils/alert';

export const validateBroadcastDeclaration = ({ declaration }) => {
  if (!declaration.on) {
    fail(
      'Broadcast channel declarations should have at least one trigger',
      MISSING_TRIGGER
    );
  }
};

export const validateBroadcastSituation = () => {};
export const validateBroadcastReducer = () => {};
export const validateBroadcastReaction = () => {};
