import toArray from '../../utils/toArray';

export default ({ reducer, reducerElse, validator }) => {
  const reducers = toArray(reducer);
  const reducersElse = toArray(reducer);

  reducers.map(validator)
  reducersElse.map(validator)

  return { reducers, reducersElse }
};
