module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'parser': 'babel-eslint',
  'rules': {
    'camelcase': 1,
    "eol-last": 1,
    'indent': ['error', 4, {'SwitchCase': 1}],
    'semi': 1,
    // "complexity": ["warn", { "max": 3 }],
    // TODO change to 2 when we do something more sane with the console errors
    'no-console': 0,
    'no-trailing-spaces': 1,
    'no-unused-vars': 1,
    'no-extra-parens': 1,
    'block-scoped-var': 2,
    'eqeqeq': 1
  }
};
