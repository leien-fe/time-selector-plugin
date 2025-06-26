import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import css from "rollup-plugin-css-only";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: "dist/time-selector-plugin.cjs.js",
                format: "cjs",
                plugins: [terser()],
            },
            {
                file: "dist/time-selector-plugin.esm.js",
                format: "esm",
                plugins: [terser()],
            },
            {
                file: "dist/time-selector-plugin.umd.js",
                format: "umd",
                name: "TimeSelector",
                plugins: [terser()],
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({ babelHelpers: "bundled", presets: ["@babel/preset-env"] }),
            css({ output: 'time-selector-plugin.css' }), // 将 CSS 提取到单独的文件
        ],
    }
];