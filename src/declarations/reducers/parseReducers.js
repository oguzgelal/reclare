import toArray from '../../utils/toArray';

export default ({
  reducer,
  reducerDeclared,
  reducerElse,
  reducerElseDeclared,
}) => ({
  reducers: reducerDeclared ? toArray(reducer) : [],
  reducersElse: reducerElseDeclared ? toArray(reducerElse) : [],
});
