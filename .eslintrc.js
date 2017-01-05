module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    'node': true,
  },
  globals: {
    'JSON': true
  },
  rules: {
    'semi': [2, 'never'],
    'quotes': [2, 'single'],
    'arrow-body-style': 0,
    'object-shorthand': 0,
    'func-names': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
  }
}
