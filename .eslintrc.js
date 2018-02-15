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
    'indent': ['error', 2],
    'semi': 1,
    // TODO change to 2 when we do something more sane with the console errors
    'no-console': 0,
    'camelcase': 1,
    'no-unused-vars': 1
  }
};
