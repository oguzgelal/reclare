const Benchmark = require('./');
Benchmark.resolvePath = require('../dist/cjs/path/resolvePath').default;
Benchmark._ = require('lodash');
Benchmark.immutadot = require('immutadot')


Benchmark.setup(() => {
  const path = 'k1.k2.k3.k4.k5';
  const arr = path.split('.');
  const obj = { k1: { k2: { k3: { k4: { k5: 'hey' } } } } };
  return { arr, path, obj };
});

Benchmark.add('lodash get', ({ _, obj, path }) => {
  _.get(obj, path)
})

Benchmark.add('immutadot get', ({ immutadot, obj, path }) => {
  immutadot.get(obj, path);
})

Benchmark.add('resolvePath', ({ resolvePath, obj, path }) => {
  resolvePath(obj, path);
})

Benchmark.run();