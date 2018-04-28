import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/reclare.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  external: ['react'],
}