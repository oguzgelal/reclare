import { AFTER_SET_STATE } from './hookTypes';
import invokeSubscriptions from '../subscriptions/invokeSubscriptions';

// Register set of internal functions to run on relevant hook

export default {
  [AFTER_SET_STATE]: [invokeSubscriptions]
};
