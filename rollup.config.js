import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import cleanup from "rollup-plugin-cleanup";

export default [
    {
        input: "currencies.json",
        output: {
            file: "json/currencies.js",
            format: "cjs",
            name: "currencies"
        },
        plugins: [
            json({
                namedExports: false,
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "localeFormats.json",
        output: {
            file: "json/localeFormats.js",
            format: "cjs",
            name: "localeFormats"
        },
        plugins: [
            json({
                namedExports: false,
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "index.js",
        output: {
            file: "dist/esm/argon-formatter.esm.js",
            format: "esm",
            name: "argonFormatter",
            exports: "named"
        },
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            }),
            commonjs(),
            cleanup()
        ]
    },
    {
        input: "index.js",
        output: {
            file: "dist/js/argon-formatter.js",
            format: "umd",
            name: "argonFormatter",
            exports: "named"
        },
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            }),
            commonjs(),
            babel({
                exclude: "node_modules/**"
            }),
            cleanup()
        ]
    },
    {
        input: "index.js",
        output: {
            file: "dist/esm/argon-formatter.esm.min.js",
            format: "esm",
            name: "argonFormatter",
            exports: "named"
        },
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            }),
            commonjs(),
            terser()
        ]
    },
    {
        input: "index.js",
        output: {
            file: "dist/js/argon-formatter.min.js",
            format: "umd",
            name: "argonFormatter",
            exports: "named"
        },
        plugins: [
            resolve({
                customResolveOptions: {
                    moduleDirectory: "node_modules"
                }
            }),
            commonjs(),
            babel({
                exclude: "node_modules/**"
            }),
            terser()
        ]
    }
]