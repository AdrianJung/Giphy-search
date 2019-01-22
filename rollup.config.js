import browsersync from 'rollup-plugin-browsersync'
import postcss from 'rollup-plugin-postcss'
import postcssNormalize from 'postcss-normalize';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = isProduction === false;

module.exports = {
    input: 'src/scripts/index.js',
    output: {
      file: 'public/giphy.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      filesize(),
      commonjs(),
      nodeResolve(),
      postcss({
        extract: true,
        plugins: [
          postcssNormalize(),
          require('autoprefixer')
        ]
      }),
      (isDevelopment && browsersync({server: 'public'})),
      (isProduction && terser()),
    ]
  };
