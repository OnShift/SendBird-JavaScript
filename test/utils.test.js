const utils = require('../src/js/utils');

test('the testrunner is configured properly', () => {
    expect(utils).not.toBe(undefined);
});
