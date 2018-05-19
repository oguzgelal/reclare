import toArray from '../../utils/toArray';

export default ({ situation, validator }) => {
  const situations = toArray(situation);

  situations.map(validator)

  return { situations }
};
