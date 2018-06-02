import { ON_EVENT, ON_STATE_CHANGE, DUCKS } from '../config/constants';
import appendArray from '../utils/appendArray';

const parseDucks = ducks => {
  const parsed = {};
  ducks.forEach(duckContents => {
    parsed[ON_EVENT] = appendArray(parsed[ON_EVENT], duckContents[ON_EVENT]);
    parsed[ON_STATE_CHANGE] = appendArray(
      parsed[ON_STATE_CHANGE],
      duckContents[ON_STATE_CHANGE]
    );

    // if duckfile composes other duckfiles, recurse and merge
    const parsedChild = parseDucks(duckContents[DUCKS] || []);
    Object.keys(parsedChild).forEach(key => {
      parsed[key] = appendArray(parsed[key], parsedChild[key]);
    });
  });

  return parsed;
};

export default ducks => parseDucks(ducks);
