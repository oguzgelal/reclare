const Benchmark = require('./');
Benchmark.setPath = require('../dist/cjs/path/setPath').default;
Benchmark._ = require('lodash');
Benchmark.fp = require('lodash/fp');

Benchmark.setup(() => {
  const path = 'k1.k2.k3.k4.k5';
  const arr = path.split('.');
  const obj = { k1: { k2: { k3: { k4: { k5: 'hey' } } } } };
  return { arr, path, obj };
});

Benchmark.add('_lodash set immutable', ({ fp, path, obj }) => {
  fp.set(path, 'hey2', obj)
})

Benchmark.add('lodash set mutable', ({ _, path, obj }) => {
  _.set(obj, path, 'hey2')
})

Benchmark.add('setPath', ({ obj, path, setPath }) => {
  setPath(obj, path, 'hey2');
})

Benchmark.add('_direct set', ({ obj }) => {
  obj.k1.k2.k3.k4.k5 = 'hey2'
})

Benchmark.run();