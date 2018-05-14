const Benchmark = require('./');
Benchmark._ = require('lodash');
Benchmark.executePath = require('../dist/cjs/path/executePath').default;
Benchmark.resolvePath = require('../dist/cjs/path/resolvePath').default;

Benchmark.setup(() => {
  const path = 'k1.k2.k3.k4.k5';
  const arr = path.split('.');
  const obj = { k1: { k2: { k3: { k4: { k5: 'hey' } } } } };
  return { arr, path, obj };
});

Benchmark.add('_eval', ({ obj, path }) => {
  try { eval(`obj.${path}`) }
  catch (e) { }
})

Benchmark.add('executePath', ({ obj, path, executePath }) => {
  let acc = obj;
  executePath(path, (node) => {
    if (acc[node] === undefined) {
      return false;
    } else {
      acc = acc[node];
      return true;
    }
  }, { fromRoot: true })
})

Benchmark.add('reduce', ({ obj, arr }) => {
  arr.reduce((acc, current) => {
    return acc ? acc[current] : null
  }, obj)
})

Benchmark.add('lodash _.get', ({ _, obj, arr }) => {
  _.get(obj, arr)
})

Benchmark.add('_recursive', ({ resolvePath, obj, path }) => {
  // this was a recursive implementation. it was slow.
  resolvePath(obj, path)
})

Benchmark.add('_regular access', ({ obj }) => {
  const x = obj.k1.k2.k3.k4.k5;
})

Benchmark.run();