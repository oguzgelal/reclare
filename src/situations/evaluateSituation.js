import ctx from '../ctx';
import { operatorShapeValid } from '../utils/operators';

export default ({ situation, eventKey, payload }) => {
  if (typeof situation === 'function') {
    return situation({
      state: ctx.state,
      event: payload,
    });
  } else if (typeof situation === 'object') {
    if (!operatorShapeValid) {
      warning(
        'Invalid operator object shape provided, interpreting as a regular object.',
        'xFhXz861H2w51g'
      );
      return !!situation;
    } else {
      // TODO: implement recursive function to evaluate operators
    }
  } else {
    return !!situation;
  }
};
