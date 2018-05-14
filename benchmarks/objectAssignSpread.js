const Benchmark = require('./');

Benchmark.setup(() => {
  const state = { a: { b: { c: { d: 'hey' } } } };
  const assign = { a: { b: { c: { d: 'hey2' } } } };
  return { state, assign }
});

Benchmark.add('Object.assign', ({ state, assign }) => {
  const x = Object.assign({}, state, assign)
})

Benchmark.add('Object.assign mutate', ({ state, assign }) => {
  const x = Object.assign(state, assign)
})

Benchmark.add('spread', ({ state, assign }) => {
  const x = { ...state, ...assign };
})

Benchmark.run();