import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image'
import visualizer from 'rollup-plugin-visualizer';
import typescript from '@rollup/plugin-typescript';
import {dependencies, peerDependencies } from './package.json';

const config = {
  input: './src/index.ts',
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs'
    // },
    {
      dir: "dist",
      format: 'esm'
    }
  ],
  external: Object.keys({ ...dependencies, ...peerDependencies }),
  plugins: [
    typescript(),
    external(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    image(),
    visualizer()
  ]
};
export default config;