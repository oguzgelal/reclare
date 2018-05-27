import toArray from '../../utils/toArray';

export default ({
  situation,
  situationDeclared,
}) => ({
  situations: situationDeclared ? toArray(situation) : []
});
