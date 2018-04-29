import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;
const ext = env === "production" ? "min.js" : "js";

const config = {
  input: "src/main.js",
  external: ["react"],
  output: [
    {
      file: `dist/reclare.${ext}`,
      format: "umd",
      name: "Reclare",
      globals: { react: "React" },
    },
  ],
  plugins: [
    nodeResolve(),
    babel({ exclude: "**/node_modules/**" }),
    replace({ "process.env.NODE_ENV": JSON.stringify(env) }),
    commonjs(),
  ],
};

if (env === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  );
}

export default config;
