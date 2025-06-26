import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: "dist/index.cjs.js",
                format: "cjs",
                plugins: [terser()],
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                plugins: [terser()],
            },
            {
                file: "dist/index.min.js",
                format: "umd",
                name: "TimeSelector",
                plugins: [terser()],
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({ babelHelpers: "bundled", presets: ["@babel/preset-env"] }),
        ],
    }
];