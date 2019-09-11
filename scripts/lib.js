const path = require('path')
const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const vue =  require('rollup-plugin-vue')
const babel = require('rollup-plugin-babel')
const postcss = require('rollup-plugin-postcss')
const {terser} = require('rollup-plugin-terser')
const typescript = require('rollup-plugin-typescript')

async function build (inputOption, outputOption) {
  const bundle = await rollup.rollup(inputOption)
  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOption);
  // or write the bundle to disk
  await bundle.write(outputOption);
}

function resolveLibs(config) {
  const bundleList = []

  config.forEach(fileOptions => {

    const {files, dest} = fileOptions

    files.forEach(file => {
      const {name} = path.parse(file)

      const inputOption = {
        input: file,
        plugins: [
          typescript({
            tslib: require('tslib')
          }),
          commonjs(),
          vue(),
          babel({
            babelrc: false,
            presets: [['@babel/env', { modules: false, useBuiltIns: false }]],
            plugins: [],
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            externalHelpers: true,
            extensions: ['.js', '.vue', 'jsx']
          }),
          postcss({
            extensions: ['.less', '.css'],
            use: [
              'less'
            ],
            plugins: []
          }),
          terser()
        ],
      }

      const outputFile = path.join('lib', dest || '', `${name}.js`)
      
      const outputOption = {
        format: 'es',
        file: outputFile
      }

      bundleList.push({inputOption, outputOption})
    })

  })

  return bundleList
}

const config = require(path.resolve(__dirname, '../config/lib.config.js'))
let fileOptions = resolveLibs(config)

fileOptions.forEach(({inputOption, outputOption}) => {
  build(inputOption, outputOption)
  // console.log(inputOption, outputOption)
})