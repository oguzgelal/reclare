//warning(
//  'Invalid operator object shape, interpreting as a regular object.',
//  'xFhXz861H2w51g'
//);

export default ({ situation }) => {
  if (typeof situation === 'function') {
  } else if (typeof situation === 'object') {
  } else {
    return !!situation;
  }
};
