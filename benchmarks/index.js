/**
 * To execute the benchmarks, run `node <test_file>.js`
 * To create benchmark tests:
 * 1. Require this file into a variable (Benchmark)
 * 2. Call Benchmark.setup, pass the setup function as an argument, 
 *    which return an object that should be available to the tests.
 *    The function will be re-evaluated.
 * 3. Call Benchmark.add, pass test name and test function.
 * 4. Test functions receive the Benchmark instance as an argument. Object 
 *    returned from the setup function is accessible. 
 * 5. Call Benchmark.run to start testing
 * 6. To disable a test, prefix the name with an underscore 
 * 7. To test a method from the codebase, first build with `npm run build`,
 *    then `require` the method from `dist/cjs` directory.
 *    Assign it to the Benchmark object.
 */

const Benchmark = require('benchmark');

class Bench {
  setup(fn) {
    const obj = fn();
    Object.assign(this, obj);
  }
  onStart(e) {
    this.setup();
    console.log(`Benchmarking "${e.currentTarget.name}"`);
  }
  onComplete(e) {
    if (e.currentTarget.error) { }
    console.log(`Cycles: ${e.currentTarget.cycles} (${e.currentTarget.count} execs in ${Math.round(e.currentTarget.times.elapsed * 100) / 100} secs)`);
    console.log(`Ops/s: ${Math.round(e.currentTarget.hz).toLocaleString()} ±${Math.round(e.currentTarget.stats.rme * 100) / 100}%`);
    console.log('');
  }
  onError(e) {
    console.log('Error:', JSON.stringify(e.message));
  }
  add(name, test) {
    const self = this;
    if (!this.benchmarks) {
      this.benchmarks = [];
    }
    this.benchmarks.push(
      new Benchmark({
        name,
        fn: () => {
          try {
            test(self);
          } catch (e) {
            self.onError(e);
          }
        },
        onStart: this.onStart,
        onComplete: this.onComplete,
        onError: this.onError,
      })
    )
  }
  run() {
    console.log('');
    for (var i = 0; i < this.benchmarks.length; i++) {
      if (this.benchmarks[i].name[0] !== '_') {
        this.benchmarks[i].run();
      }
    }
  }
}

module.exports = new Bench();