/**
 * What is the most efficient way to test if an object has a key
 */
const Benchmark = require('./');

Benchmark.setup(() => ({
  obj: {
    a: 'lorem',
    b: 'ipsum',
    c: 'dolor',
    d: 'sit',
    e: 'amet',
  }
}))

Benchmark.add('has own property', ({ obj }) => {
  if (obj.hasOwnProperty('test')) {
    return true;
  }
})

Benchmark.add('in', ({ obj }) => {
  if ('test' in obj) {
    return true;
  }
});

// winner
Benchmark.add('undefined check', ({ obj }) => {
  if (obj.test !== undefined) {
    return true;
  }
})

Benchmark.run();