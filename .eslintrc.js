const env = require('./env')
let config = Object.keys(env)).reduce((obj, v) => {
    return {
      ...obj, 
      [v]: true
    }
  }, {})

module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'standard',
    'plugin:vue/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  env: {
    browser: true
  },
  globals: {
    ...config
  },
  root: true
}