import toArray from '../../utils/toArray';

export default ({ reducer, reducerElse }) => ({
  reducers: toArray(reducer),
  reducersElse: toArray(reducerElse),
});
