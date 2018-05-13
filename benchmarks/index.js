/**
 * To execute the benchmarks, run `node benchmarks/<test_file>.js`
 * To create benchmark tests:
 * 
 * 1. Require this file, assign it to a variable Benchmark
 * 2. Call Benchmark.setup, pass a setup function if needed
 * 3. Call Benchmark.add, pass test name and test function
 * 4. Call Benchmark.run to start testing
 */

const Benchmark = require('benchmark');

class Bench {
  setup(fn) {
    this.setupFn = fn;
  }
  onStart(e) {
    console.log(`Benchmarking "${e.currentTarget.name}"`);
  }
  onComplete(e) {
    if (e.currentTarget.error) { }
    console.log(`Cycles: ${e.currentTarget.cycles} (${e.currentTarget.count} execs in ${Math.round(e.currentTarget.times.elapsed * 100) / 100} secs)`);
    console.log(`Ops/s: ${Math.round(e.currentTarget.hz).toLocaleString()} ±${Math.round(e.currentTarget.stats.rme * 100) / 100}%`);
    console.log('');
  }
  onError(e) {
    console.log('Error:', JSON.stringify(e));
  }
  add(name, test) {
    if (!this.benchmarks) {
      this.benchmarks = [];
    }
    this.benchmarks.push(
      new Benchmark({
        name,
        setup: this.setupFn,
        fn: test,
        onStart: this.onStart,
        onComplete: this.onComplete,
        onError: this.onError,
      })
    )
  }
  run() {
    console.log('');
    for (var i = 0; i < this.benchmarks.length; i++) {
      this.benchmarks[i].run();
    }
  }
}

module.exports = new Bench();